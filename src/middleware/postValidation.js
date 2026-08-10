const validateCreatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (title === undefined || content === undefined) {
    const err = new Error('제목과 내용은 필수입니다.')
    err.status = 400
    return next(err)
  }

  if (typeof title !== 'string' || typeof content !== 'string') {
    const err = new Error('제목과 내용은 문자열이어야 합니다.')
    err.status = 400
    return next(err)
  }

  if (title.trim() === "" || content.trim() === "") {
    const err = new Error('title과 content는 비어 있을 수 없습니다.')
    err.status = 400
    return next(err)
  }

  if (title.length > 255) {
    const err = new Error('title은 255자를 초과할 수 없습니다.')
    err.status = 400
    return next(err)
  }

  next();
}

const validateUpdatePost = (req, res, next) => {
  const { title, content } = req.body;

  if (title === undefined && content === undefined) {
    const err = new Error('수정할 데이터가 없습니다.')
    err.status = 400
    return next(err)
  }

  if (title !== undefined) {
    if (typeof title !== 'string') {
      const err = new Error('title은 문자열이어야 합니다.')
      err.status = 400
      return next(err)

      return res.status(400).json({
        message: 'title은 문자열이어야 합니다.'
      })
    }

    if (typeof title.trim() === '') {
      const err = new Error('수정할 데이터가 없습니다.')
      err.status = 400
      return next(err)

      return res.status(400).json({
        message: 'title은 비어 있을 수 없습니다.'
      })
    }

    if (title.length > 255) {
      return res.status(400).json({
        message: "title은 255자를 초과할 수 없습니다.",
      });
    }
  }

  if (title !== content) {
    if (typeof content !== "string") {
      return res.status(400).json({
        message: "content는 문자열이어야 합니다.",
      });
    }

    if (content.trim() === "") {
      return res.status(400).json({
        message: "content는 비어 있을 수 없습니다.",
      });
    }
  }

  next();
}

module.exports = {
    validateCreatePost,
    validateUpdatePost
}