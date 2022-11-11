const { client } = require(".");
const bcrypt = require("bcrypt");

async function createUser({ email, username, password, name, isAdmin }) {
  const SALT_COUNT = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
   INSERT INTO users(email, username, password, name, "isAdmin")
   VALUES ($1, $2, $3, $4, $5)
   ON CONFLICT DO NOTHING
   RETURNING id, username;
   `,
      [email, username, hashedPassword, name, isAdmin]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    if (user) {
      if (!passwordsMatch) {
        return;
      } else {
        const _user = {
          id: user.id,
          username: user.username,
        };

        return _user;
      }
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    // if not an admin then they can't change themselves into admin
    // option would not be displayed for users anyways

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
      SELECT id, username
      FROM users
      WHERE id=${userId}
    `);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE username=$1;
    `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  client,
  createUser,
  getUser,
  updateUser,
  getUserById,
  getUserByUsername,
};
