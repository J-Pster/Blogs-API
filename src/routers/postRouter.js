const express = require('express');
const rescue = require('express-rescue');

const PostController = require('../controllers/postController');
const jwt = require('../middlewares/jwt');
const GenericControllers = require('../controllers/genericControllers');
const JoiBodyVals = require('../middlewares/JoiBodyVals');
const JoiParamVals = require('../middlewares/JoiParamVals');

const router = express.Router();

// Especiais

router.get('/search', [
  jwt.validateToken,
  rescue(PostController.search),
]);

// Na Collection

router.post('/', [
  jwt.validateToken,
  JoiBodyVals.validateNewPost,
  JoiBodyVals.validateIfCategoriesExists,
  rescue(PostController.create),
]);

router.get('/', [
  jwt.validateToken,
  rescue(PostController.getAll),
]);

router.put('/', rescue(GenericControllers.notAllowed));

router.delete('/', rescue(GenericControllers.notAllowed));

// No Recurso

router.post('/:id', rescue(GenericControllers.notAllowed));

router.get('/:id', [
  jwt.validateToken,
  JoiParamVals.validateIfPostExists,
  rescue(PostController.getById),
]);

router.put('/:id', [
  jwt.validateToken,
  JoiParamVals.validateIfPostExists,
  JoiBodyVals.validateUpdatePost,
  jwt.validateIfOwnThePost,
  rescue(PostController.update),
]);

router.delete('/:id', [
  jwt.validateToken,
  JoiParamVals.validateIfPostExists,
  jwt.validateIfOwnThePost,
  rescue(PostController.deletePost),
]);

module.exports = router;