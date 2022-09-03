const { BlogPost, PostCategory, Category, User } = require('../database/models');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
      },
    ],
  });

  if (!post) return { error: { code: 'notFound', message: 'Post does not exist' } };
  return post;
};

const create = async ({ title, content, categoryIds, userId }) => {
  const newPost = {
    title,
    content,
    userId,
    updated: new Date(),
    published: new Date(),
  };
  const post = await BlogPost.create(newPost);

  const categories = categoryIds.map(
    (categoryId) => PostCategory.create({ postId: post.id, categoryId }),
  );
  await Promise.all(categories);
  return post;
};

module.exports = {
  create,
  getAll,
  getById,
};