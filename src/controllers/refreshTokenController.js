const {
    createRefreshToken,
    findRefreshToken,
    removeRefreshToken,
    refreshAccessToken
} = require('../services/refreshTokenService')

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body

        if (!refreshToken) {
            const err = new Error("Refresh Token이 필요합니다.");
            err.status = 400;

            throw err;
        }

        const accessToken = await refreshAccessToken(refreshToken)

        return res.status(200).json({
            accessToken
        });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    refresh
}