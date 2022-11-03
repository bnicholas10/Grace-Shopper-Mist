const client = require(".");

const fetchBooks = async () => {
  const response = await client.query(`
    SELECT * FROM books
    `);
  return response.rows;
};

module.exports = {
  fetchBooks,
};

// comment from bernie to see if it works
