const { User } = require('../database/models');
const jwt = require('../middlewares/jwt');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) return { error: { code: 'badRequest', message: 'Invalid fields' } };
  return jwt.generateToken(user);
};

module.exports = {
  login,
};