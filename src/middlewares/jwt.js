require('dotenv').config();

const jwt = require('jsonwebtoken');

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

module.exports = {
  generateToken,
};