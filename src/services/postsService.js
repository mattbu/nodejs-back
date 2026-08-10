const {findAll, findById, create, update, remove} = require('../repositories/postsRepository')

const findAllPosts = () => {
  return findAll();
};

const findPostById = (id) => {
  const post = findById(id);

  if (!post) {
    const err = new Error("게시글이 없습니다.");
    err.status = 404;

    throw err;
  }
  return post;
};

const createNewPost = async ({ title, content }) => {
  const newPostId = await create({ title, content })
  return newPostId;
};

const updatePost = async (id, data) => {
  if (data.title === undefined && data.content === undefined) {
    const err = new Error('수정할 데이터가 없습니다.');
    err.status = 400

    throw err
  }

  const result = await update(id, data);

  if (result.affectedRows === 0) {
    const err = new Error("게시글이 없습니다.");
    err.status = 404;

    throw err;
  }

  return true
};

const removePost = async (id) => {
  const result = await remove(id);

  if (result.affectedRows === 0) {
    const err = new Error("게시글이 없습니다.");
    err.status = 404;

    throw err;
  }

  return true;
};

module.exports = {
  findAllPosts,
  findPostById,
  createNewPost,
  updatePost,
  removePost,
};
