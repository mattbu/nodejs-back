const jwt = require('jsonwebtoken')
const ms = require('ms')

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

const rotateRefreshToken = async (token) => {
    // 1. token 검증
    const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET,
    )
    
    // 2. DB 확인
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

    // 4. 새로운 accessToken 생성
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
    // 5. 새로운 refreshToken 생성
    const refreshToken = jwt.sign(
        {
            userId: user.id,
        },
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
        }
    )

    // 6. 기존 token 삭제
    await remove(token)
    
    // 7. 새로운 refreshToken DB 저장
    const expiresAt = new Date(
        Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN)
    );

    await createRefreshToken({
        userId: user.id,
        token: refreshToken,
        expiresAt
    })
    
    // 8. 두 token 반환
    return {
        accessToken,
        refreshToken
    }
}

module.exports = {
    createRefreshToken,
    findRefreshToken,
    removeRefreshToken,
    rotateRefreshToken
}