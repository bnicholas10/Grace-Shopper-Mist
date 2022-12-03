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
  checkCart,
  checkPurchased,
  getPurchasedByUserId,
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
      const purchasedItems = await getPurchasedByUserId(user.id);
      res.send({ success: true, data: { cartItems, purchasedItems } });
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
    const existsInCart = await checkCart({ userId: userId, gameId: gameId });
    const purchased = await checkPurchased({ userId: userId, gameId: gameId });
    if (existsInCart) {
      res.send({
        success: false,
        error: { message: "This game is already in your cart" },
      });
    } else if (purchased) {
      res.send({
        success: false,
        error: { message: "You already own this game" },
      });
    } else {
      const result = await addToCart(input);
      if (!result) {
        res.send({
          success: false,
          error: { message: "something went wrong" },
        });
      } else {
        res.send({ success: true });
      }
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
cartRouter.patch("/", async (req, res, next) => {
  const user = req.user;
  const { cartId } = req.body;
  try {
    const result = await updateCart({ id: cartId, purchased: true });
    res.send({ success: true, data: { result } });
  } catch (error) {
    next(error);
  }
});

module.exports = cartRouter;
