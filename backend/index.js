const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const port = 3000;
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json())

app.use(cors({
    "origin": ["https://localhost:8080"],
    "credentials": true,
    "methods": ["GET", "POST"]
}));

const io = socket()




app.listen(port, () => console.log(`server listening on port: ${port}`));