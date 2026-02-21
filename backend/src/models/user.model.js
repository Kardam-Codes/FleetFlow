const pool = require("../database/db");

// Create new user
const createUser = async (name, email, hashedPassword, role) => {
  const query = `
    INSERT INTO users (name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, role, created_at
  `;

  const values = [name, email, hashedPassword, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Find user by email
const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

// Find user by ID
const findUserById = async (id) => {
  const query = `
    SELECT id, name, email, role, created_at
    FROM users
    WHERE id = $1
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
