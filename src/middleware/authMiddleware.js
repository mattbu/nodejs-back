const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require('../errors')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new UnauthorizedError("인증이 필요합니다."))
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      return next(new UnauthorizedError("유효하지 않은 인증 형식입니다."))
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (err) {
    return next(new UnauthorizedError("유효하지 않은 인증 정보입니다."))
  }
};

module.exports = authMiddleware;
