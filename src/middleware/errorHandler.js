const { AppError } = require("../errors");
const logger = require('../config/logger')

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);

    // Custom Error
    if (err instanceof AppError) {
        const response = {
            message: err.message
        };

        if (err.details) {
            response.errors = err.details;
        }

        return res.status(err.status).json(response);
    }

    // 예상하지 못한 에러
    if (process.env.NODE_ENV === "development") {
        return res.status(500).json({
            message: err.message,
            stack: err.stack,
        });
    }
    
    // production
    return res.status(500).json({
        message: "서버 내부 오류가 발생했습니다."
    });
};

module.exports = errorHandler;