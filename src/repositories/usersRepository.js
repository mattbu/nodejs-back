const pool = require('../config/db')

const create = async ({email, password, name}) => {
    const [result] = await pool.execute(
        `INSERT INTO users (email, password, name)
        VALUES (?, ?, ?)
        `,
        [email, password, name]
    )

    return result.insertId
}

const findByEmail = async (email) => {
    const [rows] = await pool.execute(
        `SELECT id, email, password, name, role
        FROM users
        WHERE email = ?
        `,
        [email]
    )

    return rows[0]
}

const findById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT id, email, name, role
      FROM users
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

const findAll = async () => {
    const [rows] = await pool.execute(
        `SELECT id, email, name, role, created_at
        FROM users
        `
    )

    return rows
}

module.exports = {
    create,
    findByEmail,
    findById,
    findAll
}