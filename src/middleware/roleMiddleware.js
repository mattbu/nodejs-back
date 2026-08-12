const jwt = require("jsonwebtoken")

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            const err = new Error('접근 권한이 없습니다.')
            err.status = 403

            return next(err)
        }

        next()
    }
}

module.exports = roleMiddleware