const express = require("express");
const publisherRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");
const morgan = require("morgan");

publisherRouter.use((req, res, next) => {
  console.log("A request is being made to /publishers");
  next();
});

publisherRouter.get("/", async (req, res) => {
  const publishers = await getAllPublishers();

  res.send({
    publishers,
  });
});

publisherRouter.get("/:publisherName/games", async (req, res, next) => {
  const publisherName = req.params.publisherName;
  try {
    const games = await getGamesByPublisherName(publisherName);
    res.send({ games });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = publisherRouter;
