require("dotenv").config();
const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const port = 3000;
const bodyParser = require("body-parser");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "18.221.11.205"
}) 


const app = express();

app.use(bodyParser.json())

app.use(cors({
    "origin": ["http://localhost:5500"],
    "credentials": true,
    "methods": ["GET", "POST", "OPTIONS"]
}));

const server = require("http").createServer(app);

const queue = {
    league: 0
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


server.listen(port, () => console.log(`server listening on port: ${port}`));
