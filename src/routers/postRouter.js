const express = require('express');
const rescue = require('express-rescue');

const PostController = require('../controllers/postController');
const jwt = require('../middlewares/jwt');
const GenericControllers = require('../controllers/genericControllers');
const JoiBodyVals = require('../middlewares/JoiBodyVals');

const router = express.Router();

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
  rescue(PostController.getById),
]);

router.put('/:id', rescue(GenericControllers.notAllowed));

router.delete('/:id', rescue(GenericControllers.notAllowed));

module.exports = router;