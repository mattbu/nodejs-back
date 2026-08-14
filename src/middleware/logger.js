const logger = require('../config/logger')

const requestLogger = (req, res, next) => {
    const start = Date.now();

    logger.info(
        `[REQUEST] ${req.method} ${req.originalUrl}`
    );

    res.on("finish", () => {
        const duration = Date.now() - start;

        logger.info(
            `[RESPONSE] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });

    next();
};

module.exports = requestLogger;