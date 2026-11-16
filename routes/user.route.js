const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const { validateUser } = require('../validators/joi.validator');


router.get('/', userController.getAllUsers);
router.post('/signup', validateSignup, userController.signup);
router.post('/signin', validateSignin, userController.signin);

module.exports = router;