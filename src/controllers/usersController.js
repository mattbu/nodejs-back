const { createUser,loginUser, findAllUsers } = require('../services/usersService')
const { createUserDto, createLoginDto } = require('../dtos/usersDto')
const { successResponse } = require('../utils/response')

const register = async (req, res, next) => {
    try {
        const data = await createUserDto(req.body)
        const userId = await createUser(data)

        return successResponse(
            res,
            201,
            '회원가입이 완료되었습니다.',
            { id: userId }
        )
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const data = await createLoginDto(req.body)
        const result = await loginUser(data)

        return successResponse(
            res,
            200,
            '로그인 성공',
            {
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
                user: result.user,
            }
        )
    } catch (err) {
        next(err)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await findAllUsers()

        return successResponse(
            res,
            200,
            '',
            users
        )
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    getUsers
}