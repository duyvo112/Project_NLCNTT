const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a" }, // Ảnh đại diện
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách bạn bè
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Lời mời kết bạn
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
