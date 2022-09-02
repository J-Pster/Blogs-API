const notAllowed = (_req, res) => res.status(405).json();

module.exports = {
  notAllowed,
};