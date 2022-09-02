const express = require('express');
const rescue = require('express-rescue');

const LoginController = require('../controllers/loginController');
const GenericControllers = require('../controllers/genericControllers');
const JoiBodyVals = require('../middlewares/JoiBodyVals');

const router = express.Router();

// Na Collection

router.post('/', [
  JoiBodyVals.validateLogin,
  rescue(LoginController.login),
]);

router.get('/', rescue(GenericControllers.notAllowed));

router.put('/', rescue(GenericControllers.notAllowed));

router.delete('/', rescue(GenericControllers.notAllowed));

// No Recurso

router.post('/:id', rescue(GenericControllers.notAllowed));

router.get('/:id', rescue(GenericControllers.notAllowed));

router.put('/:id', rescue(GenericControllers.notAllowed));

router.delete('/:id', rescue(GenericControllers.notAllowed));

module.exports = router;