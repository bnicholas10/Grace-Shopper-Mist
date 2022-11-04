const express = require("express");
const { fetchGames } = require("../db/games");

const gamesRouter = express.Router();

gamesRouter.get("/", async (req, res, next) => {
  const games = await fetchGames();
  res.send({ success: true, games });
});

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
