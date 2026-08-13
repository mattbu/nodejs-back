const pool = require('../config/db')

const create = async ({ userId, token, expiresAt }) => {
    const [result] = await pool.execute(
        `
        INSERT INTO refresh_tokens (
            user_id,
            token,
            expires_at
        )
        VALUES (?, ?, ?)
        `,
        [userId, token, expiresAt]
    );

    return result.insertId;
};

const createWithConnection = async (connection, {
    userId,
    token,
    expiresAt
}) => {
    const [result] = await connection.execute(
        `INSERT INTO refresh_tokens (
            user_id,
            token,
            expires_at
        )
        VALUES (?, ?, ?)
        `,
        [userId, token, expiresAt]
    )

    return result.insertId;
}

const findByToken = async (token) => {
    const [rows] = await pool.execute(
        `SELECT *
        FROM refresh_tokens
        WHERE token = ?
        AND expires_at > NOW()
        `,
        [token]
    )

    return rows[0]
}

const remove = async (token) => {
    const [result] = await pool.execute(
        `DELETE FROM refresh_tokens
        WHERE token = ?
        `,
        [token]
    )

    return result.affectedRows > 0;
}

const removeWithConnection = async (connection, token) => {
    const [result] = await connection.execute(
        `DELETE FROM refresh_tokens
        WHERE token = ?
        `,
        [token]
    )

    return result.affectedRows > 0;
}

module.exports = {
    create,
    createWithConnection,
    findByToken,
    remove,
    removeWithConnection
}