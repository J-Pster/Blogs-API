const express = require('express');
const rescue = require('express-rescue');

const CategoriesController = require('../controllers/categoriesController');
const jwt = require('../middlewares/jwt');
const GenericControllers = require('../controllers/genericControllers');
const JoiBodyVals = require('../middlewares/JoiBodyVals');

const router = express.Router();

// Na Collection

router.post('/', [
  jwt.validateToken,
  JoiBodyVals.validateNewCategory,
  rescue(CategoriesController.create),
]);

router.get('/', [
  jwt.validateToken,
  rescue(CategoriesController.getAll),
]);

router.put('/', rescue(GenericControllers.notAllowed));

router.delete('/', rescue(GenericControllers.notAllowed));

// No Recurso

router.post('/:id', rescue(GenericControllers.notAllowed));

router.get('/:id', rescue(GenericControllers.notAllowed));

router.put('/:id', rescue(GenericControllers.notAllowed));

router.delete('/:id', rescue(GenericControllers.notAllowed));

module.exports = router;