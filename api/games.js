const express = require("express");
const {
  getAllGames,
  getGameById,
  getGamesByCategory,
  createGame,
  updateGame,
  deleteGame,
} = require("../db/games");
const { getUser } = require("../db/users");

const gamesRouter = express.Router();

// GET all games
gamesRouter.get("/", async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.send({ success: true, data: games });
  } catch (error) {
    next(error);
  }
});

gamesRouter.get("/:gameId", async (req, res, next) => {
  const { gameId } = req.params;
  try {
    const game = await getGameById(gameId);
    if (!game) {
      res.send({
        success: false,
        error: {
          name: "GameNotFoundError",
          message: "Could not find a game with that gameId",
        },
      });
    } else {
      res.send({ success: true, data: game });
    }
  } catch (error) {
    next(error);
  }
});

gamesRouter.post("/", async (req, res, next) => {
  // verify user is admin
  const user = req.user;
  const { name, price, publisher, description, rating, category, image } =
    req.body;
  try {
    if (user.isAdmin) {
      const result = await createGame({
        name,
        price,
        publisher,
        description,
        rating,
        category,
        image,
      });
      if (!result) {
        res.send({
          success: false,
          error: {
            name: "error creating game",
            message: "error creating game",
          },
        });
      } else {
        res.send({ success: true, data: result });
      }
    } else {
      res.send({
        success: false,
        error: {
          name: "Auth Error",
          message: "User must be an Admin for this action",
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

gamesRouter.patch("/:gameId", async (req, res, next) => {
  const user = req.user;
  const { gameId } = req.params;
  const { name, price, publisher, description, rating, category, image } =
    req.body;
  // const body = req.body;
  try {
    if (!gameId) {
      res.send({
        success: false,
        error: { name: "Game not found", message: "No game with that ID" },
      });
    }

    if (user.isAdmin === true) {
      const result = await updateGame({
        gameId,
        name,
        price,
        publisher,
        description,
        rating,
        category,
        image,
      });

      if (!result) {
        res.send({
          success: false,
          error: {
            name: "error updating game",
            message: "error updating game",
          },
        });
      } else {
        res.send({ success: true, data: result });
      }
    } else {
      res.send({
        success: false,
        error: {
          name: "Auth Error",
          message: "User must be an Admin for this action",
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

gamesRouter.delete("/:gameId", async (req, res, next) => {
  const user = req.user;
  const { gameId } = req.params;
  try {
    if (user.isAdmin) {
      const result = await deleteGame(gameId);
      if (!result) {
        res.send({
          success: false,
          error: {
            name: "error deleting game",
            message: "error deleting game",
          },
        });
      } else {
        res.send({ success: true, data: result });
      }
    } else {
      res.send({
        success: false,
        error: {
          name: "Auth Error",
          message: "User must be an Admin for this action",
        },
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = gamesRouter;
