class AppError extends Error {
      constructor(message, status) {
        super(message);

        this.name = "AppError";
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends AppError {
    constructor(message = "잘못된 요청입니다.") {
        super(message, 400);
    }
}

class UnauthorizedError extends AppError {
    constructor(message = "인증이 필요합니다.") {
        super(message, 401);
    }
}

class ForbiddenError extends AppError {
    constructor(message = "접근 권한이 없습니다.") {
        super(message, 403);
    }
}

class NotFoundError extends AppError {
    constructor(message = "요청한 리소스를 찾을 수 없습니다.") {
        super(message, 404);
    }
}

class ConflictError extends AppError {
    constructor(message = "이미 존재하는 데이터입니다.") {
        super(message, 409);
    }
}

module.exports = {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError
};