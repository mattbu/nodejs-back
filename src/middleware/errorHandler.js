const { AppError } = require("../errors");

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        const response = {
            message: err.message
        };

        if (err.details) {
            response.errors = err.details;
        }

        return res.status(err.status).json(response);
    }

    console.error(err);

    return res.status(500).json({
        message: "서버 내부 오류가 발생했습니다."
    });
};

module.exports = errorHandler;