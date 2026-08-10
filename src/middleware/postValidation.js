const {body, param} = require('express-validator')

const validatePostId = [
  param('id')
    .isInt({min: 1})
    .withMessage("id는 1 이상의 정수여야 합니다.")
]

const validateCreatePost = [
  body('title')
    .notEmpty()
    .withMessage("title은 필수입니다.")
    .isString()
    .withMessage("title은 문자열이어야 합니다.")
    .trim()
    .isLength({ max: 255 })
    .withMessage("title은 255자를 초과할 수 없습니다."),

  body("content")
    .notEmpty()
    .withMessage("content는 필수입니다.")
    .isString()
    .withMessage("content는 문자열이어야 합니다.")
    .trim(),
]

const validateUpdatePost = [
  body()
    .custom((value) => {
      if (value.title === undefined && value.content === undefined) {
        throw new Error('수정할 데이터가 없습니다.')
      }

      return true
    }),

  body('title')
    .optional()
    .isString()
    .withMessage("title은 문자열이어야 합니다.")
    .trim()
    .isLength({ max: 255 })
    .withMessage("title은 255자를 초과할 수 없습니다."),

  body("content")
    .optional()
    .isString()
    .withMessage("content는 문자열이어야 합니다.")
    .trim(),
]

module.exports = {
  validatePostId,
  validateCreatePost,
  validateUpdatePost
}