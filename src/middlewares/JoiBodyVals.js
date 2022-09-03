const Joi = require('joi');
const { Category } = require('../database/models');

const validateLogin = (req, _res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { email, password } = req.body;

  const { error } = schema.validate({ email, password });
  if (error) {
    next({ code: 'badRequest', message: 'Some required fields are missing' });
    return false;
  }

  next();
};

const validateNewUser = (req, _res, next) => {
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { displayName, email, password } = req.body;

  const { error } = schema.validate({ displayName, email, password });

  if (error) return next(error);
  next();
};

const validateNewCategory = (req, _res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { name } = req.body;

  const { error } = schema.validate({ name });

  if (error) return next(error);
  next();
};

const validateNewPost = (req, _res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    categoryIds: Joi.array().items(Joi.number().integer()).required(),
  });
  const { title, content, categoryIds } = req.body;

  const { error } = schema.validate({ title, content, categoryIds });

  if (error) {
    next({ code: 'badRequest', message: 'Some required fields are missing' });
    return false;
  }

  next();
};

const validateIfCategoriesExists = async (req, _res, next) => {
  const { categoryIds } = req.body;

  const categories = await Category.findAll({ where: { id: categoryIds } });

  if (categories.length !== categoryIds.length) {
    next({ code: 'badRequest', message: '"categoryIds" not found' });
    return false;
  }

  next();
};

module.exports = {
  validateLogin,
  validateNewUser,
  validateNewCategory,
  validateNewPost,
  validateIfCategoriesExists,
};