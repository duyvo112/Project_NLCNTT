const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người bình luận
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Bài viết được bình luận
  text: { type: String, required: true }, // Nội dung bình luận
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);