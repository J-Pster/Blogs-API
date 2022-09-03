const PostService = require('../services/postService');

const getAll = async (_req, res, _next) => {
  const response = await PostService.getAll();
  return res.status(200).json(response);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const response = await PostService.getById(id);

  if (response.error) return next(response.error);
  return res.status(200).json(response);
};

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const response = await PostService.create({ title, content, categoryIds, userId: id });
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const response = await PostService.update(id, title, content);
  if (response.error) return next(response.error);

  return res.status(200).json(response);
};

const deletePost = async (req, res, _next) => {
  const { id } = req.params;
  console.log('---- DELETING POST CONTROLLER ----');
  const response = await PostService.deletePost(id);
  if (response.error) return res.status(400).json(response.error);
  return res.status(204);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};