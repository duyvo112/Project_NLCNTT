const User = require('../models/User');

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
            res.json(updatedUser);
          } catch (error) {
            res.status(500).json({ error: "Lỗi cập nhật thông tin" });
          }
    },
    updateAvatar: (req, res) => {
       res.json({ message: 'Update avatar' });
    }
}
module.exports = userController;