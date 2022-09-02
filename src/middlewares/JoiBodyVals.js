const Joi = require('joi');

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

module.exports = {
  validateLogin,
  validateNewUser,
  validateNewCategory,
};