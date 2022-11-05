const express = require("express");
const { getAllGames } = require("../db/games");

const gamesRouter = express.Router();

// GET all games
gamesRouter.get("/", async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.send(games);
  } catch (error) {
    next(error);
  }
});
module.exports = gamesRouter;
