const posts = [
  {
    id: 1,
    title: "첫 번째 글",
    content: "안녕하세요",
  },
  {
    id: 2,
    title: "두 번째 글",
    content: "Express 공부중",
  },
];

const findAllPosts = () => {
  return posts;
};

const findPostById = (id) => {
  const post = posts.find((post) => post.id === id);

  if (!post) {
    const err = new Error("게시글이 없습니다.");
    err.status = 404;

    throw err;
  }
  return post;
};

const createNewPost = ({ title, content }) => {
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);

  return newPost;
};

const updatePost = (id, data) => {
  const targetIdx = posts.findIndex((post) => post.id === id);

  if (targetIdx === -1) {
    return null;
  }

  posts[targetIdx] = {
    ...posts[targetIdx],
    ...data,
  };

  return posts[targetIdx];
};

const removePost = (id) => {
  const targetIdx = posts.findIndex((post) => post.id === id);

  if (targetIdx === -1) {
    return false;
  }

  posts.splice(targetIdx, 1);

  return true;
};

module.exports = {
  findAllPosts,
  findPostById,
  createNewPost,
  updatePost,
  removePost,
};
