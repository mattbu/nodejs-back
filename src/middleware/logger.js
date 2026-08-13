const logger = (req, res, next) => {
    const start = Date.now();

    console.log(
        `[REQUEST] ${req.method} ${req.originalUrl}`
    );

    res.on("finish", () => {
        const duration = Date.now() - start;

        console.log(
            `[RESPONSE] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
        );
    });

    next();
};

module.exports = logger;