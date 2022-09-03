require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User, BlogPost } = require('../database/models');

const SECRET = process.env.JWT_SECRET;
const CONFIG = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, SECRET, CONFIG);
  const tokenStructure = {
    token,
  };
  return tokenStructure;
};

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next({ code: 'jwt', message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET);

    const user = await User.findOne({ where: { email: decoded.data.email } });
    if (!user) return next({ code: 'jwt', message: 'Erro ao procurar usuário do token' });

    req.user = user;

    next();
  } catch (err) {
    return next({ code: 'jwt', message: 'Expired or invalid token' });
  }
};

const validateIfOwnThePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const post = await BlogPost.findByPk(id);

  if (Number(post.userId) !== Number(userId)) {
    return next({ code: 'jwt', message: 'Unauthorized user' }); 
  }

  console.log('---- DONO DO POST FEITO ----');
  next();
};

module.exports = {
  generateToken,
  validateToken,
  validateIfOwnThePost,
};