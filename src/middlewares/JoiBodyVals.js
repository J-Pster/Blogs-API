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

module.exports = {
  validateLogin,
};