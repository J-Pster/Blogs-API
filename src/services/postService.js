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
  console.log('---- DELETING POST ----');
  const deletedPost = await BlogPost.destroy({ where: { id } });
  if (!deletedPost) return { error: { code: 'notFound', message: 'Post does not exist' } };
  return deletedPost;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};