const {
  findAllPosts,
  findPostById,
  createNewPost,
  updatePost,
  removePost,
} = require("../services/postsService");

const getPosts = (req, res, next) => {
  try {
    const posts = findAllPosts();
    return res.json(posts);
  } catch (err) {
    next(err);
  }
};

const getPost = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const post = findPostById(id);

    return res.json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = (req, res, next) => {
  try {
    const newPost = createNewPost(req.body);

    return res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

const updatePosts = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const updatedPost = updatePost(id, data);

    if (!updatedPost) {
      return res.status(404).json({
        message: "게시글이 없습니다.",
      });
    }

    return res.status(200).json({
      message: "수정이 완료되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};

const removePosts = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const isRemoved = removePost(id);

    if (!isRemoved) {
      return res.status(404).json({
        message: "게시글이 없습니다.",
      });
    }

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
