const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người đăng
  imageUrl: { type: String, required: true }, // Ảnh đăng lên Cloudinary
  publicId: { type: String, required: true }, // ID của ảnh trên Cloudinary
  caption: { type: String, default:""}, // Dòng tin nhắn kèm ảnh
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách người đã thả tim
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Người bình luận
      text: { type: String, required: true }, // Nội dung bình luận
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
