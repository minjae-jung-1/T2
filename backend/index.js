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
    league: 0,
    csgo: {

    }
}


const io = socket(server)

io.set("origins", "*:*")

io.on("connection", (socket) => {
    console.log("user connected :)");
    socket.on("queueLeague", (data)=>{
        console.log("nice queu laeuge")
        queue.league++
        console.log(queue.league)
    })
})


const users = require("./routes/users");
app.use("/api/users", users)




server.listen(port, () => console.log(`server listening on port: ${port}`));
