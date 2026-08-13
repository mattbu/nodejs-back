const { rotateRefreshToken, logout: logoutRefreshToken } = require('../services/refreshTokenService')
const { successResponse } = require('../utils/response')
const { BadRequestError } = require('../errors')

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            throw new BadRequestError("Refresh Token이 필요합니다.");
        }

        const tokens = await rotateRefreshToken(refreshToken)

        return successResponse(
            res,
            200,
            '',
            tokens
        )
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        const { refreshToken } = req.body
        
        if (!refreshToken) {
            throw new BadRequestError("Refresh Token이 필요합니다.");
        }

        await logoutRefreshToken(refreshToken);

        return successResponse(
            res,
            200,
            "로그아웃 되었습니다."
        )
    } catch (err) {
        next(err)
    }
}

module.exports = {
    refresh,
    logout
}