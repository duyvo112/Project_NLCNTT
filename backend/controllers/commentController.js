const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

const commentController = {
    commentPost: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) return res.status(404).json({ msg: "Post not found" });
           
            const newComment = new Comment({
                user: req.user.id,
                post: req.params.id,
                text: req.body.text,
            });

            const savedComment = await newComment.save();

            post.comments.push(savedComment._id);
            await post.save();

            return res.json({ msg: "Comment added", comment: savedComment });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    getComments: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate("comments").populate("user");
            if (!post) return res.status(404).json({ msg: "Post not found" });

            return res.json(post.comments);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    deleteComment: async (req, res) => {
        try {
            const comment = await Comment.findById(req.params.id);
            if (!comment) return res.status(404).json({ msg: "Comment not found" });

            // Kiểm tra xem người dùng hiện tại có phải là chủ sở hữu của bình luận hay không
            if (comment.user.toString() !== req.user.id) {
                return res.status(403).json({ msg: "You are not authorized to delete this comment" });
            }

            await Comment.findByIdAndDelete(req.params.id);
            await Post.findOneAndUpdate(
                { comments: req.params.id },
                { $pull: { comments: req.params.id } }
            );
            return res.json({ msg: "Comment deleted successfully" });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    
    
}
module.exports = commentController;