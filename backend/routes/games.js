const express = require("express");
const Game = require("../models/game");
const GamesController = require("../controllers/games");


const router = express.Router();

router.route("/create")
    .post(GamesController.createMatch);

module.exports = router;
