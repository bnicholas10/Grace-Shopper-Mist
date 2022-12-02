const { client } = require(".");

async function getGameById(gameId) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
      SELECT *
      FROM games
      WHERE id=$1;
    `,
      [gameId]
    );

    return game;
  } catch (error) {
    throw error;
  }
}

async function getGameByName(name) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
      SELECT *
      FROM games
      WHERE name=$1;
    `,
      [name]
    );

    if (!game) {
      throw {
        name: "GameNotFoundError",
        message: "Could not find a game with that name",
      };
    }

    return game;
  } catch (error) {
    throw error;
  }
}

async function getGamesByCategory(category) {
  try {
    const { rows: games } = await client.query(
      `
      SELECT * FROM games WHERE category = $1;
    `,
      [category]
    );
    console.log(games);
    return games;
  } catch (error) {
    throw error;
  }
}

async function getAllGames() {
  try {
    const { rows: gameIds } = await client.query(`
      SELECT id
      FROM games;
    `);

    const games = await Promise.all(
      gameIds.map((game) => getGameById(game.id))
    );

    return games;
  } catch (error) {
    throw error;
  }
}

async function createGame({
  name,
  price,
  publisher,
  description,
  rating,
  category,
  image,
}) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
      INSERT INTO games(name, price, publisher, description, rating, category, image ) 
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `,
      [name, price, publisher, description, rating, category, image]
    );

    return game;
  } catch (error) {
    throw error;
  }
}

async function updateGame({
  gameId,
  name,
  price,
  publisher,
  description,
  rating,
  category,
  image,
}) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
      UPDATE games
      SET 
      name = COALESCE($2, name),
      price = COALESCE($3, price),
      publisher = COALESCE($4, publisher),
      description = COALESCE($5, description),
      rating = COALESCE($6, rating),
      category = COALESCE($7, category),
      image = COALESCE($8, image)
      WHERE id=$1
      RETURNING*;
      `,
      [gameId, name, price, publisher, description, rating, category, image]
    );
    return game;
  } catch (error) {
    throw error;
  }
}

// async function updateGame(gameId, fields = {}) {
//   // build the set string
//   const setString = Object.keys(fields)
//     .map((key, index) => `"${key}"=$${index + 1}`)
//     .join(", ");

//   try {
//     // update any fields that need to be updated
//     if (setString.length > 0) {
//       await client.query(
//         `
//         UPDATE games
//         SET ${setString}
//         WHERE id=${gameId}
//         RETURNING *;
//       `,
//         Object.values(fields)
//       );
//     }

//     return await getGameById(gameId);
//   } catch (error) {
//     throw error;
//   }
// }

async function deleteGame(gameId) {
  try {
    const { rows: result } = await client.query(
      `
      DELETE FROM games WHERE id = $1 RETURNING *;
    `,
      [gameId]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getGameById,
  getGameByName,
  getAllGames,
  createGame,
  updateGame,
  getGamesByCategory,
  deleteGame,
};
