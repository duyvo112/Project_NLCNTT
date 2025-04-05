const mongoose = require("mongoose");

const banUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  reason: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const BanUser = mongoose.model("BanUser", banUserSchema);

module.exports = BanUser;
