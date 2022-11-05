require("dotenv").config();
const { Pool } = require("pg");

const client = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {
        password: process.env.DB_PASSWORD,
        user: "postgres",
        database: "grace-starter",
      }
);

async function getAllPublishers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM publishers;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getGamesByPublisherName(publisherName) {
  try {
    const { rows: gameIds } = await client.query(
      `
        SELECT games.id
        FROM games
        JOIN game_publishers ON games.id=game_publishers."gameId"
        JOIN publishers ON publishers.id=game_publishers."publisherId"
        WHERE publishers.name=$1;
      `,
      [publisherName]
    );

    return await Promise.all(gameIds.map((game) => getGameById(game.id)));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  getGamesByPublisherName,
  getAllPublishers,
};
