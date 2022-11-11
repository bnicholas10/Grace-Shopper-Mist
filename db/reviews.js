const { client } = require(".");

const createReview = async ({ userId, gameId, message, rating }) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews ("userId", "gameId", message, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [userId, gameId, message, rating]
    );

    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewById = async (id) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT *
    FROM reviews
    WHERE "id" = $1;
    `,
      [id]
    );
    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewsByUser = async (userId) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT * 
    FROM reviews 
    WHERE "userId" = $1;
    `,
      [userId]
    );
    return review;
  } catch (error) {
    throw error;
  }
};

const getReviewsByGame = async (gameId) => {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT * 
    FROM reviews 
    WHERE "gameId" = $1;
    `,
      [gameId]
    );
    return review;
  } catch (error) {
    throw error;
  }
};

async function updateReview(id, userId, message) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      UPDATE reviews
      message = COALESCE($3, message),
      WHERE reviews.id =$1 AND "userId" = $2
      RETURNING*;
      `,
      [id, userId, message]
    );
    return review;
  } catch (error) {
    throw error;
  }
}

const deleteReview = async (id, userId) => {
  try {
    const {
      rows: [deletedReview],
    } = await client.query(
      `
    DELETE FROM reviews
    WHERE "id" = $1 AND "userId" = $2
    `,
      [id, userId]
    );

    return deletedReview;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getReviewById,
  getReviewsByUser,
  getReviewsByGame,
  updateReview,
  deleteReview,
  createReview,
};
