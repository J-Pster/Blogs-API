const UserService = require('../services/userService');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const user = { displayName, email, password, image };

  const response = await UserService.createUser(user);
  if (response.error) return next(response.error);
  return res.status(201).json(response);
};

module.exports = {
  createUser,
};