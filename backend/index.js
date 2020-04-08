require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db_pass = process.env.DB_PASS;
const url = `mongodb://chatRoyale:${db_pass}@18.221.11.205:27017`;
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");

// TODO configure multer like 4bran
// TODO generate certs and setup HTTPS and serve up HTML from build folder as static pages

mongoose.Promise = global.Promise;
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});

var privateKey = fs.readFileSync("./certs/private.pem");
var certificate = fs.readFileSync("./certs/public.pem");

const credentials = { key: privateKey, cert: certificate }

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    "origin": ["https://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));

const server = https.createServer(credentials, app);

const queue = {
    league: {
        playerCount: 0,
        playerIds: []
    },
    csgo: {
        playerCount: 0,
        playerIds: []
    },
    users: []
}





const users = require("./routes/users");
app.use("/api/users", users)


server.listen(port, () => console.log(`server listening on port: ${port}`));


const io = require("socket.io")(server)

io.set("origins", "*:*")

io.on("connection", (socket) => {

    socket.emit("queueStatus", queue);

    socket.on("joinUsers", (data) => {
      if(!queue.users.find(user => user._id === data._id)) {
        let user = data;
        user.status = "Online"
        queue.users.push(user)
      }
      socket.emit("playerJoined", queue)
    })

    socket.on("queueLeague", (data) => {
        console.log(data);
        if (!queue.league.playerIds.includes(data.user._id)) {
            queue.users.forEach((user) => {
                if (user._id === data.user._id) {
                    user.status = "In Queue";
                } 
            })
            queue.league.playerCount++;
            queue.league.playerIds.push(data.user._id);
            socket.emit("playerJoined", queue);
        }
    })

    socket.on("queueCsgo", (data) => {
        console.log(data, "HEY WTF");
        // re-enable the "duplicate check"
        // if (!queue.csgo.playerIds.includes(data.user._id)){
            queue.users.forEach((user) => {
                if (user._id === data.user._id) {
                    user.status = "In Queue";
                } 
            })
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

    socket.on("checkStatus", (data) => {
        let status = {
            csgo: false,
            league: false
        }
        if (queue.league.playerIds.includes(data.id)){
            status.league = true;
        }
        if (queue.csgo.playerIds.includes(data.id)){
            status.csgo = true;
        }
        socket.emit("userQueueStatus", status);
    })

    socket.on("SEND_MESSAGE", (data) => {
        console.log(data);
        socket.broadcast.emit("MESSAGE", {
            data
        })
    })
})