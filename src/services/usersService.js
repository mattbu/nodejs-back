const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {
    create,
    findByEmail,
    findAll
} = require('../repositories/usersRepository')

const { createRefreshToken } = require('../services/refreshTokenService')

const createUser = async ({email, password, name}) => {
    const exsistingUser = await findByEmail(email);

    if (exsistingUser) {
        const err = new Error('이미 가입된 이메일입니다.')
        err.status = 409

        throw err
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    const userId = await create({
        email,
        password: hasedPassword,
        name
    })

    return userId
}

const loginUser = async ({email, password}) => {
    const user = await findByEmail(email)

    if (!user) {
        const err = new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        err.status = 401;

        throw err;
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        const err = new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
        err.status = 401;

        throw err;
    }

    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    )

    const refreshToken = jwt.sign(
        {
            userId: user.id
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        }
    )

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await createRefreshToken({
        userId: user.id,
        token: refreshToken,
        expiresAt,
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    }
}

const findAllUsers = async () => {
    return await findAll()
}

module.exports = {
    createUser,
    loginUser,
    findAllUsers
}