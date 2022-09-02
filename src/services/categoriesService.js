const { Category } = require('../database/models');

const create = async (name) => {
  const category = await Category.create({ name });
  return category;
};

module.exports = {
  create,
};