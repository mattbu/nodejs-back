const { findAll, findById, create, update, remove } = require('../repositories/postsRepository')
const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors')

const findAllPosts = () => {
  return findAll();
};

const findPostById = async (id) => {
  const post = await findById(id);

  if (!post) {
    throw new NotFoundError("게시글이 없습니다.")
  }
  return post;
};

const createNewPost = async ({ title, content, userId }) => {
  const newPostId = await create({ title, content, userId })
  return newPostId;
};

const updatePost = async (id, userId, data) => {
  if (data.title === undefined && data.content === undefined) {
    throw new BadRequestError('수정할 데이터가 없습니다.')
  }

  const post = await findById(id)

  if (!post) {
    throw new NotFoundError("게시글이 없습니다.")
  }

  if (post.user_id !== userId) {
    throw new ForbiddenError('수정 권한이 없습니다.')
  }

  await update(id, data);

  return true
};

const removePost = async (id, userId) => {
  const post = await findById(id);

  if (!post) {
    throw new NotFoundError("게시글이 없습니다.")
  }

  if (post.user_id !== userId) {
    throw new ForbiddenError('삭제 권한이 없습니다.')
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
