const { Category } = require('../database/models');

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getById = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return { error: { code: 'badRequest', message: 'Category does not exist' } };
  return category;
};

const create = async (name) => {
  const category = await Category.create({ name });
  return category;
};

module.exports = {
  create,
  getAll,
  getById,
};