const express = require('express');
const rescue = require('express-rescue');

const UserController = require('../controllers/userController');
const jwt = require('../middlewares/jwt');
const GenericControllers = require('../controllers/genericControllers');
const JoiBodyVals = require('../middlewares/JoiBodyVals');

const router = express.Router();

// Especiais

router.delete('/me', [
  jwt.validateToken,
  rescue(UserController.selfDelete),
]);

// Na Collection

router.post('/', [
  JoiBodyVals.validateNewUser,
  rescue(UserController.createUser),
]);

router.get('/', [
  jwt.validateToken,
  rescue(UserController.getAll),
]);

router.put('/', rescue(GenericControllers.notAllowed));

router.delete('/', rescue(GenericControllers.notAllowed));

// No Recurso

router.post('/:id', rescue(GenericControllers.notAllowed));

router.get('/:id', [
  jwt.validateToken,
  rescue(UserController.getById),
]);

router.put('/:id', rescue(GenericControllers.notAllowed));

router.delete('/:id', rescue(GenericControllers.notAllowed));

module.exports = router;