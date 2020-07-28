const express = require("express");
const Game = require("../models/game");
const GamesController = require("../controllers/games");


const router = express.Router();

router.get("/:gameId", async (req, res) => {
    let gameId = req.params.gameId;
    console.log(gameId);

    const selectedGame = await Game.findById(gameId).lean();
    res.send(selectedGame);
})

module.exports = router;
