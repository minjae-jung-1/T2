require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db_pass = process.env.DB_PASS;
const url = `mongodb://chatRoyale:${db_pass}@18.221.11.205:27017`;
const cookieParser = require("cookie-parser");

// TODO configure multer like 4bran
// TODO generate certs and setup HTTPS and serve up HTML from build folder as static pages

mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});



const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    "origin": ["http://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));

const server = require("http").createServer(app);

const queue = {
    league: {
        playerCount: 0,
        playerIds: []
    },
    csgo: {
        playerCount: 0,
        playerIds: []
    }
}


const io = socket(server)

io.set("origins", "*:*")

io.on("connection", (socket) => {
    socket.emit("queueStatus", {
        queue
    });

    socket.on("queueLeague", (data) => {
        console.log(data);
        if (!queue.league.playerIds.includes(data.user._id)){
            queue.league.playerCount++;
            queue.league.playerIds.push(data.user._id);
            socket.emit("playerJoined", queue);
        }
    })

    socket.on("queueCsgo", (data) => {
        console.log(data);
        // re-enable the "duplicate check"
        // if (!queue.csgo.playerIds.includes(data.user._id)){
            queue.csgo.playerCount++;
            queue.csgo.playerIds.push(data.user._id);
            socket.emit("playerJoined", queue);
        //}

        if (queue.csgo.playerCount === 10) {
            console.log("TRIG GGERERRREDDD ON BACK END ")
            let lobby = {};
            lobby["players"] = queue.csgo.playerIds.slice(0, 10);
            socket.emit("csgoMatchFound", lobby)
        }
    })

    socket.on("SEND_MESSAGE", (data) => {
        console.log(data);
        socket.broadcast.emit("MESSAGE", {
            data
        })
    })
})


const users = require("./routes/users");
app.use("/api/users", users)




server.listen(port, () => console.log(`server listening on port: ${port}`));
