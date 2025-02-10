const postController = require('../controllers/postController');
const upload = require('../config/Multer');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');

// @route POST /api/post
router.post('/',authMiddleware.verifyToken,upload.single("image"), postController.createPost);

// @route GET /api/post
router.get('/',authMiddleware.verifyToken, postController.getAllPosts);

// @route GET /api/post/:id

router.get('/:id',authMiddleware.verifyToken, postController.getPost);

// @route DELETE /api/post/:id

router.delete('/:id',authMiddleware.verifyToken, postController.deletePost);

// @route PUT /api/post/like/:id

router.put('/like/:id',authMiddleware.verifyToken, postController.likePost);

// @route PUT /api/post/comment/:id

router.put('/comment/:id',authMiddleware.verifyToken, commentController.commentPost);

// @route GET /api/post/comment/:id

router.get('/comment/:id',authMiddleware.verifyToken, commentController.getComments);
module.exports = router;
