const CategoriesService = require('../services/categoriesService');

const getAll = async (_req, res) => {
  const response = await CategoriesService.getAll();
  return res.status(200).json(response);
};

const create = async (req, res) => {
  const { name } = req.body;
  const response = await CategoriesService.create(name);
  return res.status(201).json(response);
};

module.exports = {
  create,
  getAll,
};