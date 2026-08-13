const { ForbiddenError } = require('../errors')

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            const err = new ForbiddenError('접근 권한이 없습니다.')

            return next(err)
        }

        next()
    }
}

module.exports = roleMiddleware