const pool = require('../config/db')

const {
  create,
  remove
} = require('../repositories/postLikesRepository')

const { 
  findLike, 
  increaseLikeCount, 
  decreaseLikeCount 
} = require('../repositories/postsRepository')

const { NotFoundError, ConflictError } = require('../errors')

const likePost = async (postId, userId) => {
  const connection = await pool.getConnection()

  let transactionStarted = false;

  try {
    // 1. 빠른 중복 검사
    const existingLike = await findLike(postId, userId)

    if (existingLike) {
      throw new ConflictError('이미 좋아요를 눌렀습니다.')
    }

    // 2. Transaction 시작
    await connection.beginTransaction()
    transactionStarted = true;

    // 3. 좋아요 생성
    await create(connection, {
        postId,
        userId
    })

    // 4. 좋아요 수 증가
    const updated = await increaseLikeCount(connection, postId)

    if (!updated) {
        throw new NotFoundError('게시글을 찾을 수 없습니다.')
    }

    // 5. 성공
    await connection.commit()
    transactionStarted = false;

    return {
        message: '좋아요가 등록되었습니다.'
    };
  } catch (err) {
    if (transactionStarted) {
        await connection.rollback();
    }

    // DB가 최종적으로 중복을 발견한 경우
    if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictError(
            '이미 좋아요를 눌렀습니다.'
        );
    }

    throw err
  } finally {
    await connection.release()
  }
}

const removeLike = async (postId, userId) => {
  const connection = await pool.getConnection()

  let transactionStarted = false;
  try {
    await connection.beginTransaction();
    transactionStarted = true;
    // 1. 좋아요 삭제
    const removed = await remove(connection, {
      postId,
      userId
    })

    if (!removed) {
        throw new NotFoundError('좋아요를 찾을 수 없습니다.');
    }
    // 2. 좋아요 수 감소
    const updated = await decreaseLikeCount(connection, postId)

    if (!updated) {
        throw new NotFoundError('게시글을 찾을 수 없습니다.');
    }

    // 3. 성공
    await connection.commit()
    transactionStarted = false;

    return {
        message: '좋아요가 취소되었습니다.'
    };
  } catch (err) {
    if (transactionStarted) {
      await connection.rollback()
    }
  } finally {
    await connection.release()
  }
}

module.exports = {
    likePost,
    removeLike
}