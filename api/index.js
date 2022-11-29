const express = require("express");
const gamesRouter = require("./games");
const reviewsRouter = require("./reviews");
const jwt = require("jsonwebtoken");
const usersRouter = require("./users");
const { getUserById } = require("../db/users");
const { JWT_SECRET } = process.env;

const apiRouter = express.Router();

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/games", gamesRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use("*", (req, res, next) => {
  res.status(404).send({ Error: "404", message: "Not found" });
});

apiRouter.use((error, req, res, next) => {
  console.log("ERROR: ", error);
  res.status(500).send("something broke!");
  return { error };
});

module.exports = apiRouter;
