const LoginService = require('../services/loginService');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const response = await LoginService.login(email, password);
  if (response.error) return next(response.error);
  return res.status(200).json(response);
};

module.exports = {
  login,
};