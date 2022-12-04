const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { requireUser } = require("./utilities");
const {
  createUser,
  getUserByUsername,
  getUserById,
  getUser,
  getUserByEmail,
  updateUser,
  getAllUsers,
} = require("../db/users");

const { JWT_SECRET } = process.env;

// GET /api/users
usersRouter.get("/", async (req, res) => {
  const user = req.user;
  try {
    if (user.isAdmin === true) {
      const users = await getAllUsers();
      res.send({ success: true, data: { users } });
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
    throw error;
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.send({
      success: false,
      error: {
        name: "MissingCredentialsError",
        message: "Please provide a username and password",
      },
    });
  }

  try {
    const user = await getUser({ username, password });
    if (!user) {
      res.send({
        success: false,
        error: {
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        },
      });
    } else {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "2w" }
      );
      res.send({
        success: true,
        data: { user, message: "You're logged in!", token },
      });
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/users/me
usersRouter.patch("/me", requireUser, async (req, res, next) => {
  const user = req.user;
  const { email, password, name } = req.body;
  const fields = {};
  const queriedUserByEmail = await getUserByEmail(email);

  if (
    email &&
    !email.includes(("@" && ".com") || ("@" && ".edu") || ("@" && ".gov"))
  ) {
    res.send({
      name: "UserCreationError",
      message: "Please enter a valid email",
    });
    return;
  }

  if (queriedUserByEmail) {
    res.send({
      name: "Email in Use",
      message: "That email is already registered",
    });
    return;
  }

  if (password && password.length < 8) {
    res.send({
      name: "PasswordLengthError",
      message: "Password too short! Must be 8 characters or longer.",
    });
    return;
  }

  try {
    if (email) {
      fields.email = email;
    }
    if (password) {
      fields.password = password;
    }
    if (name) {
      fields.name = name;
    }

    const result = await updateUser(user.id, fields);

    if (!result) {
      res.send({ success: false, error: { message: "Something went wrong" } });
    } else {
      res.send({ success: true, data: result });
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const queriedUser = await getUserByUsername(username);
    const queriedUserByEmail = await getUserByEmail(email);
    if (queriedUserByEmail) {
      res.send({
        name: "Email in Use",
        message: "That email is already registered",
      });
    }
    if (queriedUser) {
      res.send({
        name: "UserExistsError",
        message: "A user by that name already exists",
      });
    } else if (password.length < 8) {
      res.send({
        name: "PasswordLengthError",
        message: "Password too short! Must be 8 characters or longer.",
      });
    } else if (name.length < 2) {
      res.send({
        name: "UserCreationError",
        message: "Please enter a name. Must be longer than 2 characters",
      });
    } else if (
      !email.includes(("@" && ".com") || ("@" && ".edu") || ("@" && ".gov"))
    ) {
      res.send({
        name: "UserCreationError",
        message: "Please enter a valid email",
      });
    } else {
      const user = await createUser({
        username,
        name,
        email,
        password,
        isAdmin: false,
      });
      if (!user) {
        res.send({
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
    res.send({ user: req.user });
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

module.exports = usersRouter;
