const successResponse = (res, status, message, data = null) => {
    const response = {
        message,
    };

    if (data !== null) {
        response.data = data;
    }

    return res.status(status).json(response);
};

module.exports = {
    successResponse,
};