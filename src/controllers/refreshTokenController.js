const { rotateRefreshToken } = require('../services/refreshTokenService')

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            const err = new Error("Refresh Token이 필요합니다.");
            err.status = 400;

            throw err;
        }

        const tokens = await rotateRefreshToken(refreshToken)

        return res.status(200).json(tokens);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    refresh
}