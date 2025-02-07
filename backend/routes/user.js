const userController = require('../controllers/userController');
const router = require('express').Router();

// @route PUT /api/user/update
router.put('/update', userController.updateUser);

// @route PUT /api/user/update-avatar
router.put('/update-avatar', userController.updateAvatar);

// @route GET /api/user/:id
router.get('/:id', userController.getUser);

module.exports = router;