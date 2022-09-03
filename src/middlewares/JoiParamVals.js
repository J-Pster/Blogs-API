const PostService = require('../services/postService');

const validateIfPostExists = async (req, res, next) => {
  const { id } = req.params;
  const response = await PostService.getById(id);
  if (response.error) return next(response.error);
  next();
};

module.exports = {
  validateIfPostExists,
};