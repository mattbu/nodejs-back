const bcrypt = require('bcrypt');

const {
    create,
    findByEmail
} = require('../repositories/usersRepository')

const createUser = async ({email, password, name}) => {
    const exsistingUser = findByEmail(email);

    if (exsistingUser) {
        const err = new Error('이미 가입된 이메일입니다.')
        err.status = 409

        throw err
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    const userId = create({
        email,
        password: hasedPassword,
        name
    })

    return userId
}

module.exports = {
    createUser
}