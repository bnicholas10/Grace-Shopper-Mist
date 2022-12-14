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
    // console.log("USER: ", user);
    if (user) {
      const hashedPassword = user.password;
      const passwordsMatch = await bcrypt.compare(password, hashedPassword);
      if (!passwordsMatch) {
        return;
      } else {
        const _user = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
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

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT id, username, "isAdmin"
      FROM users
      WHERE id=$1
    `,
      [userId]
    );

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

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE email=$1;
    `,
      [email]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields) {
  if (fields.password) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(fields.password, SALT_COUNT);
    fields.password = hashedPassword;
  }
  try {
    for (let key in fields) {
      await client.query(`
      UPDATE users SET ${key} = '${fields[key]}' WHERE id = ${id};
      `);
    }

    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users WHERE id = $1;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT *
      FROM users;
    `);

    const data = await Promise.all(
      rows.map((user) => {
        delete user.password;
        return user;
      })
    );

    return data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getAllUsers,
};
