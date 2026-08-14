const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const ms = require('ms')

const { create, findByEmail, findAl } = require('../repositories/usersRepository')
const { createRefreshToken } = require('../services/refreshTokenService')
const {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError
} = require('../errors')

const createUser = async ({email, password, name}) => {
    const exsistingUser = await findByEmail(email);

    if (exsistingUser) {
        throw new ConflictError('이미 가입된 이메일입니다.')
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    const userId = await create({
        email,
        password: hasedPassword,
        name
    })

    return userId
}

const findAllUsers = async () => {
    return await findAll()
}

const loginUser = async ({email, password}) => {
    throw new Error('테스토스')
    const user = await findByEmail(email)

    if (!user) {
        throw new UnauthorizedError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new UnauthorizedError("이메일 또는 비밀번호가 올바르지 않습니다.");
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

    const expiresAt = new Date(
        Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN)
    );

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

module.exports = {
    createUser,
    findAllUsers,
    loginUser
}