const {createUser,loginUser} = require('../services/usersService')
const {createUserDto, createLoginDto} = require('../dtos/usersDto')

const register = async (req, res, next) => {
    try {
        const data = await createUserDto(req.body)
        const userId = await createUser(data)

        return res.status(201).json({
            message: '회원가입이 완료되었습니다.',
            id: userId
        })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const data = await createLoginDto(req.body)
        const result = await loginUser(data)

        return res.status(200).json({
            message: "로그인 성공",
            accessToken: result.accessToken,
            user: result.user,
        });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login
}