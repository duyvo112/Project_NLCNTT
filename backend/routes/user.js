const userController = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/Multer');

// @route PUT /api/user/update
router.put('/update',authMiddleware.verifyToken, userController.updateUser);

// @route PUT /api/user/update-avatar
router.put('/update-avatar',authMiddleware.verifyToken,upload.single("image"), userController.updateAvatar);

// @route GET /api/user/:id
router.get('/:id', userController.getUser);

module.exports = router;