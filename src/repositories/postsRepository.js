const pool = require('../config/db')

const findAll = async () => {
  const [rows] = await pool.execute(
    "SELECT * FROM posts"
  );

  return rows;
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT *
    FROM posts
    WHERE id = ?
    `,
    [id]
  );

  return rows[0]
}

const create = async ({ title, content, userId }) => {
  const [result] = await pool.execute(
    "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, userId]
  );

  return result.insertId;
};

const update = async (id, data) => {
  const fields = [];
  const values = [];

  if (data.title !== undefined) {
    fields.push("title = ?")
    values.push(data.title)
  }

  if (data.content !== undefined) {
    fields.push("content = ?")
    values.push(data.content)
  }

  values.push(id)

  const [result] = await pool.execute(
    `UPDATE posts
    SET ${fields.join(',')}
    WHERE id = ?`,
    values
  );

  return result;
};

const remove = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM posts WHERE id = ?',
    [id]
  );

  return result;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};