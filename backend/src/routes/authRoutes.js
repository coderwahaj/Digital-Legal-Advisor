const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidator = require('../validators/authValidator');
const { validate } = require('../middlewares/validationMiddleware');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', authValidator.registerValidator, validate, authController.register);
router.post('/login', authValidator.loginValidator, validate, authController.login);
router.get('/me', protect, authController.getMe);

module.exports = router;