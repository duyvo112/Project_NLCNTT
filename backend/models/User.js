const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" }, // Ảnh đại diện
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách bạn bè
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Lời mời kết bạn
});

module.exports = mongoose.model("User", userSchema);
