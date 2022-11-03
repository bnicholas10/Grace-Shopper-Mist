const client = require(".");

const fetchGames = async () => {
  const response = await client.query(`
    SELECT * FROM games;
    `);
  return response.rows;
};

module.exports = {
  fetchGames,
};

// comment from bernie to see if it works
