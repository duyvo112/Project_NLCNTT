const cloudinary = require("../config/Cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");
const BanUser = require("../models/BanUser");
const Comment = require("../models/Comment");
const postController = {
  createPost: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      // Kiểm tra ban trước khi xử lý file
      const banUser = await BanUser.findOne({ userId: req.user.id });
      if (banUser) {
        // Nếu có file đã upload, xóa file đó
        if (req.file) {
          // Xóa file khỏi Cloudinary
          await cloudinary.uploader.destroy(req.file.filename);
        }
        return res.status(403).json({ msg: "You are banned from posting." });
      }

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
      // Nếu có lỗi và file đã upload, xóa file đó
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ msg: "Post not found" });
      if (req.file) {
        await cloudinary.uploader.destroy(post.publicId);
      }

      // Cập nhật bài viết
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          imageUrl: req.file.path,
          publicId: req.file.filename,
          caption: req.body.caption,
        },
        { new: true }
      );

      return res.json(updatedPost);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("user")
        .populate("comments");
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

      // Xóa bài viết
      await Comment.deleteMany({ post: req.params.id });
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
      console.log("nguoi", req.user.id);
      // Kiểm tra xem người dùng đã thích bài viết này chưa
      const likeIndex = post.likes.findIndex(
        (like) => like.toString() === req.user.id
      );
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
  getPostByUser: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id })
        .sort({ createdAt: -1 })
        .populate("user");
      if (posts.length === 0)
        return res.status(404).json({ msg: "No posts found" });
      return res.json(posts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getPostByFriends: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const posts = await Post.find({
        user: [...user.friends, req.user.id],
      }).sort({ createdAt: -1 });
      return res.json(posts);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postController;
