const cloudinary = require('../config/Cloudinary');
const Post = require('../models/Post');
const User = require('../models/User');

const postController = {
    createPost: async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(400).json({ msg: "User does not exist." });
            
            const makePost = new Post({
                ...req.body,
                imageUrl: req.file.path,
                user: req.user.id,
                caption: req.body.caption,
                publicId: req.file.filename,
            });

            const newPost = await makePost.save();
            return res.json(newPost);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find().sort({ createdAt: -1 }).populate("user");
            return res.json(posts);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate("user");
            if (!post) return res.status(404).json({ msg: "Post not found" });
            return res.json(post);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    deletePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ msg: "Post not found" });

            // Kiểm tra xem người dùng hiện tại có phải là chủ sở hữu của bài viết hay không
            if (post.user.toString() !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to delete this post" });
            }

            // Xóa bài viết
            await cloudinary.uploader.destroy(post.publicId);
            
            await Post.findByIdAndDelete(req.params.id);
            return res.json({ msg: "Post deleted successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    likePost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ msg: "Post not found" });

            // Kiểm tra xem người dùng đã thích bài viết này chưa
            const likeIndex = post.likes.findIndex((like) => like.toString() === req.user.id);
            if (likeIndex !== -1) {
                // Nếu đã thích, bỏ thích
                post.likes.splice(likeIndex, 1);
                await post.save();
                return res.json({ msg: "Post unliked" });
            }

            // Nếu chưa thích, thêm thích
            post.likes.unshift(req.user.id);
            await post.save();
            return res.json({ msg: "Post liked" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    commentPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ msg: "Post not found" });

            const newComment = {
                user: req.user.id,
                text: req.body.text,
                
            };

            post.comments.unshift(newComment);
            await post.save();
            return res.json({ msg: "Comment added" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
};

module.exports = postController;