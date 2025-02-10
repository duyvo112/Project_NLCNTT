const User = require('../models/User');
const cloudinary = require('../config/Cloudinary');

const userController = {
    getUser: async(req, res) => {
        try {
            const user = await User.findById(req.params.id).select("-password");
            if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });
            res.json(user);
          } catch (error) {
            res.status(500).json({ error: "Lỗi lấy thông tin người dùng" });
          }
    },
    updateUser: async(req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
            return res.json(updatedUser);
          } catch (error) {
            res.status(500).json({ error: "Lỗi cập nhật thông tin" });
          }
    },
    updateAvatar: async (req, res) => {
      try {
        if (!req.file) return res.status(400).json({ error: "Không có ảnh nào được chọn" });
          // Upload ảnh lên Cloudinary
          const result = await cloudinary.uploader.upload(req.file.path, {
              folder: "mini-social-network/avatars",
              public_id: `${req.user.id}_avatar`,
              overwrite: true,
          });

          // Cập nhật đường dẫn ảnh vào cột avatar
          const updatedUser = await User.findByIdAndUpdate(
              req.user.id,
              { avatar: result.secure_url },
              { new: true }
          );

          res.json(updatedUser);
      } catch (error) {
          res.status(500).json({ error: "Lỗi cập nhật ảnh đại diện" });
      }
  }
}
module.exports = userController;