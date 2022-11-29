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
  getUserByEmail,
} = require("../db/users");

const { JWT_SECRET } = process.env;

// GET /api/users
usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({ success: true, data: { users } });
  res.send("hello testing getallusers route");
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
    const { name, username, email, password } = req.body;
    const userByUsername = await getUserByUsername(username);
    const userByEmail = await getUserByEmail(email);
    if (userByUsername) {
      res.send({
        success: false,
        error: {
          name: "UserExistsError",
          message: "A user by that name already exists",
        },
      });
    } else if (userByEmail) {
      res.send({
        success: false,
        error: {
          name: "UserExistsError",
          message: "That email is already in use",
        },
      });
    } else if (!name) {
      res.send({
        success: false,
        error: { name: "Missing name error", message: "Please provide a name" },
      });
    } else if (!email) {
      res.send({
        success: false,
        error: {
          name: "Missing email error",
          message: "Please provide an email",
        },
      });
    } else if (!username) {
      res.send({
        success: false,
        error: {
          name: "Missing username error",
          message: "Please provide a username",
        },
      });
    } else if (!password) {
      res.send({
        success: false,
        error: {
          name: "Missing password",
          message: "Please provide a password",
        },
      });
    } else if (password.length < 8) {
      res.send({
        success: false,
        error: {
          name: "PasswordLengthError",
          message: "Password too short! Must be 8 characters or longer.",
        },
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
        next({
          success: false,
          error: {
            name: "UserCreationError",
            message:
              "There was a problem registering you. Please try again in a few minutes.",
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
          data: { user, message: "You're signed up!", token },
        });
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
