const pool = require('../config/db')

const create = async ({email, password, name}) => {
    const [result] = pool.execute(
        `INSERT INTO users (email, password, name)
        VALUES (?, ?, ?)
        `,
        [email, password, name]
    )

    return result.insertId
}

const findByEmail = async (email) => {
    const [rows] = pool.execute(
        `SELECT id, email, password, name
        FROM users
        WHERE email = ?
        `,
        [email]
    )

    return rows[0]
}

module.exports = {
    create,
    findByEmail
}