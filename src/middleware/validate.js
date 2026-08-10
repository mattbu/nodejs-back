const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "잘못된 요청입니다.",
        errors: errors.array(),
      });
    }

    next();
};

module.exports = validate;