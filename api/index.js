const express = require("express");
const gamesRouter = require("./games");
const reviewsRouter = require("./reviews");

const apiRouter = express.Router();

apiRouter.use("/games", gamesRouter);
apiRouter.use("/reviews", reviewsRouter);

apiRouter.get("/", (req, res, next) => {
  res.send("api router working");
});

module.exports = apiRouter;
