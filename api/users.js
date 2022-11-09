const express = require("express");
const usersRouter = express.Router();
//const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utilities");
const {
  getAllUsers,
  createUser,
  editEmail,
  getUserByUsername,
  getUserById,
  getUser,
  getAllCompletedOrdersByUserId,
  getAllCheckoutsByUserId,
} = require("../db/users");

const { JWT_SECRET } = process.env;

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please provide a username and password",
    });
  }

  try {
    const user = await getUser({ username, password });
    if (!user) {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "2w" }
      );
      res.send({ user, username, message: "You're logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/users/me
usersRouter.patch("/me", requireUser, async (req, res, next) => {
  try {
    if (!req.body.email) {
      next({
        name: "IncorrectEmailError",
        message: "Please enter a valid email address.",
      });
    } else {
      const editedEmail = await editEmail({
        email: req.body.email,
        userId: req.body.userId,
      });
      res.send(editedEmail);
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const queriedUser = await getUserByUsername(username);
    if (queriedUser) {
      res.status(401);
      next({
        name: "UserExistsError",
        message: "A user by that name already exists",
      });
    } else if (password.length < 8) {
      res.status(401);
      next({
        name: "PasswordLengthError",
        message: "Password too short! Must be 8 characters or longer.",
      });
    } else {
      const user = await createUser({
        username,
        email,
        password,
      });
      if (!user) {
        next({
          name: "UserCreationError",
          message:
            "There was a problem registering you. Please try again in a few minutes.",
        });
      } else {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "2w" }
        );
        res.send({ user, message: "You're signed up!", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
usersRouter.get("/me", async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:userId/orders
usersRouter.get("/:userId/orders", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await getUserById(userId);
    if (!user) {
      next({
        name: "NoUser",
        message: `Could not find an order for ${userId}`,
      });
    } else if (req.user && user.id === req.user.id) {
      const orders = await getAllCompletedOrdersByUserId(userId);
      res.send(orders);
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:userId/checkouts
usersRouter.get("/:userId/checkouts", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId);

    if (!user) {
      next({
        name: "NoUser",
        message: `Could not find a user by the name of ${userId}`,
      });
    } else if (req.user && user.id === req.user.id) {
      const checkouts = await getAllCheckoutsByUserId({ userId });
      res.send(checkouts);
    }
  } catch (error) {
    next(error);
  }
});

const token = jwt.sign(
  { id: 1, username: "mistuser" },
  process.env.JWT_SECRET,
  {
    expiresIn: "5h",
  }
);

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
  res.send("hello testing getallusers route");
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      // create token & return to user
      // let token = jwt.sign(user, process.env.JWT_SECRET);

      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, name, location } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
      name,
      location,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
