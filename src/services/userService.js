const { User } = require('../database/models');
const jwt = require('../middlewares/jwt');

const serializeUser = (user) => ({
  id: user.id,
  displayName: user.displayName,
  email: user.email,
  image: user.image,
});

const getAll = async () => {
  const users = await User.findAll();
  return users.map(serializeUser);
};

const createUser = async (user) => {
  const { email, password } = user;
  const userExists = await User.findOne({ where: { email, password } });
  if (userExists) return { error: { code: 'conflict', message: 'User already registered' } };
  
  const newUser = await User.create(user);
  return jwt.generateToken(newUser);
};

module.exports = {
  createUser,
  getAll,
};