const authController = require('../controllers/authController');
const router = require('express').Router();

// @route POST /api/auth/register
router.post('/register', authController.register);

// @route POST /api/auth/login
router.post('/login', authController.login);

// @route POST /api/auth/me
router.get('/me', authController.me);

module.exports = router;