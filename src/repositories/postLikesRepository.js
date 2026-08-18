const create = async (connection, { postId, userId }) => {
  const [result] = await connection.execute(
    `
    INSERT INTO post_likes (
      post_id,
      user_id
    )
    VALUES (?, ?)
    `,
    [postId, userId]
  )

  return result.insertId
}

const remove = async (connection, { postId , userId }) => {
  const [result] = await connection.execute(
    `
    DELETE FROM post_likes
    WHERE post_id = ?
    AND user_id = ?
    `,
    [postId , userId]
  )

  return result.affectedRows > 0;
}

module.exports = {
    create,
    remove
}