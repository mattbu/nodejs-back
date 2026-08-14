const { AppError } = require("../errors");
const logger = require('../config/logger')

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        if (err.status >= 500) {
            logger.error(err.stack);
        }

        const response = {
            message: err.message
        };

        if (err.details) {
            response.errors = err.details;
        }

        return res.status(err.status).json(response);
    }

    logger.error(err.stack);

    return res.status(500).json({
        message: "서버 내부 오류가 발생했습니다."
    });
};

module.exports = errorHandler;