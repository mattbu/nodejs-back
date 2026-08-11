const {
  findAllPosts,
  findPostById,
  createNewPost,
  updatePost,
  removePost,
} = require("../services/postsService");

const { createPostDto, updatePostDto } = require("../dtos/postsDto");

const getPosts = async (req, res, next) => {
  try {
    console.log(req.user);
    const posts = await findAllPosts();
    return res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const post = await findPostById(id);

    return res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  try {
    const data = createPostDto(req.body);
    const newPostId = await createNewPost(data);

    return res.status(201).json({
      message: "게시글이 생성 되었습니다.",
      id: newPostId,
    });
  } catch (err) {
    next(err);
  }
};

const updatePosts = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = updatePostDto(req.body);

    await updatePost(id, data);

    return res.status(200).json({
      message: "수정이 완료되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};

const removePosts = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await removePost(id);

    return res.status(200).json({
      message: "삭제가 완료되었습니다.",
    });
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
