const {createUser} = require('../services/usersService')
const {createUserDto} = require('../dtos/usersDto')

const register = async (req, res, next) => {
    try {
        const data = createUserDto(req.body)
        const userId = createUser(data)

        return res.status(201).json({
            message: '회원가입이 완료되었습니다.',
            id: userId
        })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register
}