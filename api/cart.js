const express = require("express");
const cartRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
  getCartByUserId,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
  getCartItemById,
} = require("../db/cart");

const { JWT_SECRET } = process.env;

// Fetch Cart
cartRouter.get("/", async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      res.send({
        success: false,
        error: {
          name: "No user",
          message: "You must be logged in to see your cart",
        },
      });
    } else {
      const cartItems = await getCartByUserId(user.id);
      res.send({ success: true, data: cartItems });
    }
  } catch (error) {
    next(error);
  }
});

// Add to Cart
cartRouter.post("/", async (req, res, next) => {
  const { userId, gameId } = req.body;
  const input = { userId: userId, gameId: gameId, quantity: 1 };
  try {
    const result = addToCart(input);
    if (!result) {
      res.send({ success: false, error: { message: "something went wrong" } });
    } else {
      res.send({ success: true });
    }
  } catch (error) {
    next(error);
  }
});

// Clear Cart
cartRouter.delete("/", async (req, res, next) => {
  const user = req.user;
  const { cartId } = req.body;

  try {
    const queriedItem = await getCartItemById(cartId);
    if (!queriedItem) {
      res.send({
        success: false,
        error: { name: "item doesn't exit", message: "No item exists" },
      });
    } else if (queriedItem.userId !== user.id) {
      res.send({
        success: false,
        error: {
          name: "Not authorized",
          message: "You are not authorized to edit this item",
        },
      });
    } else {
      const result = await removeFromCart(cartId);
      res.send({ success: true, data: { result } });
    }
  } catch (error) {
    next(error);
  }
});

// Checkout
cartRouter.post("/", async (req, res, next) => {});
//change all cart items to purchased=true

module.exports = cartRouter;
