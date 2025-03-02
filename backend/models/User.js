const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String, default: "I'm a new user" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  avatar: {
    type: String,
    default:
      "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg",
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
