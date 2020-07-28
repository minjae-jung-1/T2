const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    players: {
        type: Array,
        required: true
    },
    gameType: {
        type: String,
        required: true
    },
    team1: {
        default: {
            captain: "",
            players: []
        },
        type: Schema.Types.Mixed
    },
    team2: {
        default: {
            captain: "",
            players: []
        },
        type: Schema.Types.Mixed
    },
    winner: {
        default: ""
    },
    map: {
        required: true,
        type: String
    }
});


const Game = mongoose.model("games", gameSchema);

module.exports = Game;