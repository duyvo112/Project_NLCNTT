const postController = require('../controllers/postController');
const upload = require('../config/Multer');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const commentController = require('../controllers/commentController');

/*---------------POST ROUTES-------------------*/

// Create Post
router.post('/',authMiddleware.verifyToken,upload.single("image"), postController.createPost);

// Get All Posts
router.get('/',authMiddleware.verifyToken, postController.getAllPosts);

// Get Post by ID
router.get('/:id',authMiddleware.verifyToken, postController.getPost);

// Delete Post
router.delete('/:id',authMiddleware.verifyTokenAndUserPostAuthorization, postController.deletePost);

// Update Post
router.put('/:id',authMiddleware.verifyTokenAndUserPostAuthorization,upload.single("image"), postController.updatePost);

// Like Post
router.put('/like/:id',authMiddleware.verifyToken, postController.likePost);

// Get Posts by User
router.get('/user/:id',authMiddleware.verifyToken, postController.getPostByUser);

/*---------------COMMENT ROUTES-------------------*/

// Comment on Post
router.put('/comment/:id',authMiddleware.verifyToken, commentController.commentPost);

// Get Comments
router.get('/comment/:id',authMiddleware.verifyToken, commentController.getComments);

// Delete Comment
router.delete('/comment/:id',authMiddleware.verifyToken, commentController.deleteComment);

/*-----------------------------------------------*/

module.exports = router;
