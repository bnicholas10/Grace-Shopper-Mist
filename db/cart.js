const { client } = require(".");

const getCartByUserId = async (id) => {
  try {
    const { rows: cart } = await client.query(
      `
      SELECT cart.id AS "cartId", cart.*, games.* FROM cart JOIN games ON cart."gameId"=games.id WHERE cart."userId"=$1 AND cart.purchased = false;
      `,
      [id]
    );
    return cart;
  } catch (error) {
    console.log("Error with getCartByUserId...");
    throw error;
  }
};

const getPurchasedByUserId = async (id) => {
  try {
    const { rows: cart } = await client.query(
      `
      SELECT cart.id AS "cartId", cart.*, games.* FROM cart JOIN games ON cart."gameId"=games.id WHERE cart."userId"=$1 AND cart.purchased = true;
      `,
      [id]
    );
    return cart;
  } catch (error) {
    console.log("Error with getPurchasedByUserId...");
    throw error;
  }
};

const getCartItemById = async (cartId) => {
  try {
    const {
      rows: [item],
    } = await client.query(
      `
    SELECT * FROM cart WHERE id = $1;
    `,
      [cartId]
    );
    return item;
  } catch (error) {
    console.log("Error with getCartItemById");
    throw error;
  }
};

const checkCart = async ({ userId, gameId }) => {
  try {
    const {
      rows: [result],
    } = await client.query(
      `
      SELECT * FROM cart WHERE "userId" = $1 AND "gameId" = $2 AND purchased = false;
    `,
      [userId, gameId]
    );
    return result;
  } catch (error) {
    console.log("Error with checkCart");
    throw error;
  }
};

const checkPurchased = async ({ userId, gameId }) => {
  try {
    const {
      rows: [result],
    } = await client.query(
      `
      SELECT * FROM cart WHERE "userId" = $1 AND "gameId" = $2 AND purchased = true;
    `,
      [userId, gameId]
    );
    return result;
  } catch (error) {
    console.log("Error with checkCart");
    throw error;
  }
};

const addToCart = async ({ userId, gameId, quantity }) => {
  try {
    const {
      rows: [result],
    } = await client.query(
      `
        INSERT INTO cart("userId", "gameId", quantity) VALUES ($1, $2, $3) RETURNING *;
       `,
      [userId, gameId, quantity]
    );
    return result;
  } catch (error) {
    console.log("Error with addToCart function...");
    throw error;
  }
};

const removeFromCart = async (id) => {
  try {
    const { rows: result } = await client.query(
      `
            DELETE FROM cart WHERE id = $1 AND cart.purchased=false RETURNING *;
        `,
      [id]
    );
    return result;
  } catch (error) {
    console.log("Error with removeFromCart function...");
    throw error;
  }
};

const updateCart = async ({ purchased, id }) => {
  try {
    const {
      rows: [result],
    } = await client.query(
      `
        UPDATE cart SET purchased = $1 WHERE id = $2;
      `,
      [purchased, id]
    );
    return result;
  } catch (error) {
    console.log("Error with updateCart function...");
    throw error;
  }
};

const clearCart = async (userId) => {
  try {
    const { rows: result } = await client.query(
      `
      DELETE FROM cart WHERE "userId" = $1;
    `,
      [userId]
    );
    return result;
  } catch (error) {
    console.log("Error with clearCart function...");
    throw error;
  }
};

module.exports = {
  getCartByUserId,
  getPurchasedByUserId,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
  getCartItemById,
  checkCart,
  checkPurchased,
};
