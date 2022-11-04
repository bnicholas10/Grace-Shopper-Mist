const client = require(".");

async function dropTables() {
  console.log("Dropping All Tables...");
  try {
    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables...");
  } catch (error) {
    console.log("Erorr while dropping tables...");
    throw error;
  }
}

async function createTables() {
  console.log("Starting to build tables...");
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false,
        "isActive" BOOLEAN DEFAULT true
      );
      
      CREATE TABLE games(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(5, 2) NOT NULL,
        publisher VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        rating VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
      );

      CREATE TABLE cart(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "gameId" INTEGER REFERENCES games(id),
        count INTEGER NOT NULL,
      );

    `);
    console.log("Finished building tables...");
  } catch (error) {
    console.log("Erorr while creating tables...");
    throw error;
  }
}

async function rebuildDB() {
  try {
    await dropTables();
    await createTables();
  } catch (error) {
    console.log("Error during rebuildDB...");
    throw error;
  }
}

module.exports = {
  rebuildDB,
  dropTables,
  createTables,
};
