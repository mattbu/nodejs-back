const { validationResult } = require('express-validator');
const { BadRequestError } = require('../errors')

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(
        new BadRequestError("잘못된 요청입니다.", errors.array())
      )
    }

    next();
};

module.exports = validate;