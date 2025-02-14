const authController = require('../controllers/authController');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

//Register User
router.post('/register', authController.register);

//Login User
router.post('/login', authController.login);

//Logout User

router.post('/logout',authMiddleware.verifyToken, authController.logout);

//Get User
router.get('/me',authMiddleware.verifyToken, authController.me);

//Refresh Token

router.post('/refresh', authController.refresh);

module.exports = router;