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
const uuidv4 = require("uuid/v4");

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
    users: [],
    lobbies: []
};




const users = require("./routes/users");
app.use("/api/users", users)


server.listen(port, () => console.log(`server listening on port: ${port}`));


const io = require("socket.io")(server)

io.set("origins", "*:*")

io.on("connection", (socket) => {

    socket.emit("queueStatus", queue);

    socket.on("joinUsers", (data) => {
        console.log("Socket_id?", socket.id);
        let foundUser = queue.users.find(user => user._id === data._id);
        if (!foundUser) {
            console.log("User client Id not equal?")
            let user = data;
            user.clientId = socket.id;
            user.status = "Online"
            queue.users.push(user)
        } else {
            // assign user new socket.id
            foundUser.clientId = socket.id;
        }
      io.emit("playerJoined", queue)
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
            io.emit("playerJoined", queue);
        }
    })

    socket.on("JOIN_ROOM", (data) => {
        console.log(data, "ROOM_ID");
        socket.join(data.room);
    })

    socket.on("acceptMatch", (data) => {
        let selectedLobby = queue.lobbies.find(selectedLobby => selectedLobby._id === data.lobby._id);
        console.log("inside my queueFunction", selectedLobby);

        selectedLobby.accepted.push(data.user._id);
        console.log("selectedLobby changes?", queue.lobbies);

    });

    // users array needs socket_id so I can directly send them the event
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
            io.emit("playerJoined", queue);
        //}

        if (queue.csgo.playerCount === 10) {
            console.log("TRIG GGERERRREDDD ON BACK END ")
            let lobby = {};
            lobby["game"] = "csgo";
            lobby["_id"] = uuidv4();
            lobby["players"] = queue.csgo.playerIds.slice(0, 10);
            lobby["accepted"] = [];
            queue.lobbies.push(lobby);
            console.log(queue.users)
            lobby.players.forEach((playerId) => {
                console.log(playerId);
                console.log("user", queue.users[0]._id)
                console.log(playerId === queue.users[0]._id)
                queue.users.forEach((user) => {
                    if (user._id === playerId) {
                        io.to(`${user.clientId}`).emit("csgoMatchFound", lobby)
                    }
                })
            })
            
            setTimeout(() => {
                let selectedLobby = queue.lobbies.find(selectedLobby => selectedLobby._id === lobby._id);
                console.log("timer", selectedLobby);
                if (lobby.players.length === selectedLobby.accepted.length) {
                    // workflow for creating the game in mongoDb and the room for the lobby
                    console.log("All are accepted and the game is ready");
                } else {
                    // accepted players !== 10 
                    let adjustedArr = removeIdlePlayers(lobby.players, selectedLobby.accepted);
                    // this returns the players WHO DID NOT ACCEPT but does not return an array of the adjusted queue to remove them.
                    console.log("Users that failed to accept", adjustedArr);
                }
            }, 15000)

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
        io.emit("userQueueStatus", status);
    })

    socket.on("SEND_MESSAGE", (data) => {
        console.log(socket.id)
        console.log(data);
        socket.broadcast.emit("MESSAGE", {
            data
        })
    })
})

Array.prototype.diff = function(a) {
    return this.filter(function (i){return a.indexOf(i) < 0;})
}

function removeIdlePlayers(arr1, arr2) {
    var newArr = [];
    
    newArr = arr1.diff(arr2);
    newArr = newArr.concat(arr2.diff(arr1));
    return newArr;
}