const express = require("express");
const { fetchGames } = require("../db/games");

const gamesRouter = express.Router();

gamesRouter.get("/", async (req, res, next) => {
  const games = await fetchGames();
  res.send({ success: true, games });
});

module.exports = gamesRouter;
