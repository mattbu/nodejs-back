const {
  findAll,
  countAll, 
  findById, 
  increaseView,
  create, 
  update, 
  remove
} = require('../repositories/postsRepository')
const { BadRequestError, ForbiddenError, NotFoundError } = require('../errors')

const findAllPosts = async ({ page, limit, keyword, sort }) => {
  const offset = (page - 1) * limit

  const posts = await findAll({ limit, offset, keyword, sort });
  const total = await countAll({ keyword })
  const totalPages = Math.ceil(total / limit);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  }
};

const findPostById = async (id) => {
  const post = await findById(id);

  if (!post) {
    throw new NotFoundError("게시글이 없습니다.")
  }

  await increaseView(id)

  return await findById(id);
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
