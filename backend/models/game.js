const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    players: {
        type: Array,
        required: true
    }
});


const Game = mongoose.model("games", gameSchema);

module.exports = Game;