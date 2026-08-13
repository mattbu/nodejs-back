const pool = require('../config/db')
const jwt = require('jsonwebtoken')
const ms = require('ms')

const {
    create,
    createWithConnection,
    findByToken,
    remove,
    removeWithConnection
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
    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction();

        // DB 작업
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
        await removeWithConnection(connection, token)
        
        // 7. 새로운 refreshToken DB 저장
        const expiresAt = new Date(
            Date.now() + ms(process.env.JWT_REFRESH_EXPIRES_IN)
        );
        await createWithConnection(connection, {
            userId: user.id,
            token: refreshToken,
            expiresAt
        })

        // 8. 모든 DB 작업 성공
        await connection.commit();

        // 9. 두 token 반환
        return {
            accessToken,
            refreshToken
        }
    } catch (err) {
        if (connection) {
            // await connection.rollback()
        }

        throw err
    } finally {
        if (connection) {
            connection.release();
        }
    }
}

const logout = async (token) => {
    const removed = await remove(token)

    if (!remove) {
        const err = new Error('유효하지 않은 Refresh Token입니다.')
        err.status = 401

        throw err
    }

    return true
}

module.exports = {
    createRefreshToken,
    findRefreshToken,
    removeRefreshToken,
    rotateRefreshToken,
    logout
}