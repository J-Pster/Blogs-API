const errJoi = (err, _req, res, next) => {
  // Se for um erro Joi
  console.log('Bateu no De Joi!');
  console.table(err);

  if (!err.isJoi) return next(err);

  console.table(err.details);

  const statusByErrorCode = {
    'string.empty': 400,
    'string.min': 400,
    'string.email': 400,
    'number.min': 422,
    'any.required': 400,
    'string.required': 400,
    'number.required': 400,
  };

  const status = statusByErrorCode[err.details[0].type] || 500;

  res.status(status).json({ message: err.message });
};

const errNotJoi = (err, _req, res, _next) => {
  console.log('Bateu no Sem Joi!');
  console.log('Erro Sem Joi Detectado!');
  console.table(err);
  console.log(err);

  const statusByErrorCode = {
    notFound: 404,
    alreadyExists: 409,
    badRequest: 400,
    conflict: 409,
    jwt: 401,
  };

  const status = statusByErrorCode[err.code] || 500;

  res.status(status).json({ message: err.message });
};

module.exports = {
  errJoi,
  errNotJoi,
};