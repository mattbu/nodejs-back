const getPostListDto = (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const keyword = query.keyword?.trim() || ''
  const sort =  query.sort || 'lastest'

  return {
    page,
    limit,
    keyword,
    sort
  }
}

const createPostDto = (body) => {
  return {
    title: body.title,
    content: body.content,
  };
};

const updatePostDto = (body) => {
  const data = {};

  if (body.title !== undefined) {
    data.title = body.title;
  }

  if (body.content !== undefined) {
    data.content = body.content;
  }

  return data;
}

module.exports = {
  getPostListDto,
  createPostDto,
  updatePostDto
};