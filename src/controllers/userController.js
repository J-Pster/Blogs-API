const UserService = require('../services/userService');

const getAll = async (_req, res) => {
  const response = await UserService.getAll();
  return res.status(200).json(response);
};

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const user = { displayName, email, password, image };

  const response = await UserService.createUser(user);
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

module.exports = {
  createUser,
  getAll,
};