const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');

const postInclude = [
  {
    model: User,
    as: 'user',
    attributes: { exclude: ['password'] },
  },
  {
    model: Category,
    as: 'categories',
  },
];

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: postInclude,
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: postInclude,
  });

  if (!post) return { error: { code: 'notFound', message: 'Post does not exist' } };
  return post;
};

const search = async (query) => {
  if (query === '') return getAll();

  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: postInclude,
  });

  return posts;
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

const update = async (id, title, content) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { error: { code: 'notFound', message: 'Post does not exist' } };

  const updatedPost = {
    ...post,
    title,
    content,
    updated: new Date(),
  };

  await post.update(updatedPost);
  return getById(id);
};

const deletePost = async (id) => {
  const deletedPost = await BlogPost.destroy({ where: { id } });
  return deletedPost;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  search,
};