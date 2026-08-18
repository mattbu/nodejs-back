const { getPostListDto } = require('../dtos/postsDto')
const {
  findAllPosts,
  findPostById,
  createNewPost,
  updatePost,
  removePost,
} = require("../services/postsService");

const { createPostDto, updatePostDto } = require("../dtos/postsDto");
const { successResponse } = require('../utils/response')

const getPosts = async (req, res, next) => {
  try {
    const data = await getPostListDto(req.query);
    const result = await findAllPosts(data);
    
    return successResponse(
      res,
      200,
      '게시글 목록이 조회 되었습니다.',
      result
    )
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const post = await findPostById(id);

    return successResponse(
      res,
      200,
      '게시글이 조회 되었습니다.',
      post
    )
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const data = createPostDto(req.body);
    const newPostId = await createNewPost({
      ...data,
      userId: req.user.userId
    });

    return successResponse(
      res, 
      201, 
      "게시글이 생성 되었습니다.",
      { id: newPostId }
    )
  } catch (err) {
    next(err);
  }
};

const updatePosts = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.userId;
    const data = updatePostDto(req.body);

    await updatePost(id, userId, data);

    return successResponse(
      res, 
      200, 
      "수정이 완료되었습니다."
    )
  } catch (err) {
    next(err);
  }
};

const removePosts = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.userId;

    await removePost(id, userId);

    return successResponse(
      res, 
      200, 
      "삭제가 완료되었습니다."
    )
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePosts,
  removePosts,
};
