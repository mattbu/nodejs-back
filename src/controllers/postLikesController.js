const { likePost, removeLike } = require('../services/postLikesService')

const { successResponse } = require('../utils/response')

const createLike = async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const userId = req.user.userId

        const result = await likePost(postId, userId)

        return successResponse(
            res,
            201,
            result.message
        )
    } catch (err) {
        next(err)
    }
}

const deleteLike = async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const userId = req.user.userId

        const result = await removeLike(postId, userId)

        return successResponse(
            res,
            200,
            result.messagee
        )
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createLike,
    deleteLike
}