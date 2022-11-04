const express = require("express");
const bookRouter = require("./gamesRouter");

const apiRouter = express.Router();

apiRouter.use("/games", gamesRouter);

apiRouter.get("/", (req, res, next) => {
  res.send("api router working");
});

module.exports = apiRouter;
