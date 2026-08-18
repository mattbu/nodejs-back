const pool = require('../config/db')

const findAll = async ({ limit, offset, keyword, sort }) => {
  const values = []
  
  let sql = `
  SELECT id, title, content, created_at, user_id
  FROM posts
  `

  if (keyword) {
    sql += `
    WHERE title LIKE ?
    OR content LIKE ?
    `

    const searchKeyword = `%${keyword}%`
    values.push(searchKeyword, searchKeyword)
  }

  const sortMap = {
      latest: "created_at DESC",
      oldest: "created_at ASC",
  };

  const orderBy = sortMap[sort] || sortMap.latest;

  sql += `
  ORDER BY ${orderBy}
  LIMIT ?
  OFFSET ?
  `

  values.push(limit, offset)

  const [rows] = await pool.query(sql, values);

  return rows;
};

const countAll = async ({ keyword }) => {
  const values = []

  let sql = `
  SELECT COUNT(*) AS total
  FROM posts
  `

  if (keyword) {
    sql += `
    WHERE title LIKE ?
    OR content LIKE ?
    `

    const searchKeyword = `%${keyword}%`
    values.push(searchKeyword, searchKeyword)
  }

  const [rows] = await pool.query(sql, values);

  return rows[0].total;
}

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

const increaseView = async (id) => {
  const [result] = await pool.execute(
    `
    UPDATE posts
    SET views = views + 1
    WHERE id = ?
    `,
    [id]
  )

  return result.affectedRows > 0
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

const findLike = async (postId, userId) => {
  const [rows] = await pool.execute(
    `
    SELECT id
    FROM post_likes
    WHERE post_id = ?
    AND user_id = ?
    `,
    [postId, userId]
  )

  return rows[0]
}

const increaseLikeCount = async (connection, id) => {
  const [result] = await connection.execute(
    `
    UPDATE posts
    SET like_counts = like_counts + 1 
    WHERE id = ?
    `,
    [id]
  )

  return result.affectedRows > 0
}

const decreaseLikeCount = async (connection, id) => {
  const [result] = await connection.execute(
    `UPDATE posts
    SET like_counts = like_counts - 1 
    WHERE id = ?
    AND like_counts > 0
    `,
    [id]
  )

  return result.affectedRows > 0
}

module.exports = {
  findAll,
  countAll,
  findById,
  create,
  update,
  remove,
  increaseView,
  findLike,
  increaseLikeCount,
  decreaseLikeCount
};