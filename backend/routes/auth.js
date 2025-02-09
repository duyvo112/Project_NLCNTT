const authController = require('../controllers/authController');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

// @route POST /api/auth/register
router.post('/register', authController.register);

// @route POST /api/auth/login
router.post('/login', authController.login);

// @route POST /api/auth/logout

router.post('/logout',authMiddleware.verifyToken, authController.logout);

// @route GET /api/auth/me
router.get('/me',authMiddleware.verifyToken, authController.me);

module.exports = router;