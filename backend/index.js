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
    "origin": ["https://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST"]
}));

const server = require("http").createServer(app);




const io = socket(server)

io.set("origins", "*:*")

io.on("connection", (socket) => {
    console.log("user connected :)");
})


server.listen(port, () => console.log(`server listening on port: ${port}`));