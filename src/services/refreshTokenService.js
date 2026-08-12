const {
    create,
    findByToken,
    remove
} = require('../repositories/refreshTokenRepository')

const { findById } = require('../repositories/usersRepository')

const createRefreshToken = async ({ userId, token, expiresAt }) => {
    return await create({
        userId,
        token,
        expiresAt,
    });
}

const findRefreshToken = async (token) => {
     return await findByToken(token);
}

const removeRefreshToken = async (token) => {
    return await remove(token)
}

const refreshAccessToken = async (token) => {
     // 1. JWT 검증
    const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET
    );

    // 2. DB에 저장된 Refresh Token인지 확인
    const savedToken = await findByToken(token)

    if (!savedToken) {
        const err = new Error('유효하지 않은 Refresh Token입니다.')
        err.status = 401

        throw err
    }

     // 3. 사용자 조회
     const user = await findById(decoded.userId)

     if (!user) {
        const err = new Error("사용자를 찾을 수 없습니다.");
        err.status = 404;

        throw err;
    }

    // 4. 새로운 Access Token 발급
    const accessToken = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )

    return accessToken;
}

module.exports = {
    createRefreshToken,
    findRefreshToken,
    removeRefreshToken,
    refreshAccessToken
}