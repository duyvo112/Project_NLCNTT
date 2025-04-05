const BanUser = require("../models/BanUser");
const User = require("../models/User");

const banController = {
  banUser: async (req, res) => {
    try {
      const { userId, reason } = req.body;

      // Kiểm tra xem user đã từng bị ban chưa
      const existingBan = await BanUser.findOne({ userId });
      if (existingBan) {
        return res.status(400).json({
          msg: "This user has already been banned before and cannot be banned again",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const banUser = new BanUser({
        userId,
        reason,
        isActive: true,
      });

      await banUser.save();

      // Cập nhật trạng thái user
      await User.findByIdAndUpdate(userId, {
        isBanned: true,
        currentBan: banUser._id,
      });

      res.status(201).json(banUser);
    } catch (error) {
      if (error.message === "This user has already been banned before") {
        return res.status(400).json({ msg: error.message });
      }
      res.status(500).json({ msg: error.message });
    }
  },
  checkBanned: async (req, res) => {
    try {
      const { userId } = req.body;
      console.log("userId", userId);
      const user = await BanUser.findOne({ userId });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = banController;
