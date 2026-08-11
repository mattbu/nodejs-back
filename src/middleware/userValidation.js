const {body} = require('express-validator')

const validateCreateUser = [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('email은 필수입니다.')
      .isEmail()
      .withMessage('올바른 email 형식이 아닙니다.'),

    body('password')
      .notEmpty()
      .withMessage("password는 필수입니다.")
      .isString()
      .withMessage("password는 문자열이어야 합니다.")
      .isLength({ min: 8 })
      .withMessage("password는 최소 8자 이상이어야 합니다."),

    body('name')
      .trim()
      .notEmpty()
      .withMessage("name은 필수입니다.")
      .isString()
      .withMessage("name은 문자열이어야 합니다.")
      .isLength({ max: 100 })
      .withMessage("name은 100자를 초과할 수 없습니다."),
]

module.exports = {
    validateCreateUser
}