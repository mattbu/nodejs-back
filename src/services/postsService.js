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

const createNewPost = async ({ title, content, userId }) => {
  const newPostId = await create({ title, content, userId })
  return newPostId;
};

const updatePost = async (id, userId, data) => {
  if (data.title === undefined && data.content === undefined) {
    const err = new Error('수정할 데이터가 없습니다.');
    err.status = 400

    throw err
  }

  const post = await findById(id)

  if (!post) {
    const err = new Error("게시글이 없습니다.");
    err.status = 404;

    throw err;
  }

  if (post.user_id !== userId) {
    const err = new Error('수정 권한이 없습니다.')
    err.status = 403;

    throw err
  }

  await update(id, data);

  return true
};

const removePost = async (id, userId) => {
  const post = await findById(id);

  if (!post) {
    const err = new Error("게시글이 없습니다.");
    err.status = 404;

    throw err;
  }

  if (post.user_id !== userId) {
    const err = new Error('삭제 권한이 없습니다.')
    err.status = 403;

    throw err
  }

  await remove(id);

  return true;
};

module.exports = {
  findAllPosts,
  findPostById,
  createNewPost,
  updatePost,
  removePost,
};
