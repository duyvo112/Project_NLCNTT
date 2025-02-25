const User = require("../models/User");
const cloudinary = require("../config/Cloudinary");

const userController = {
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user)
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Lỗi lấy thông tin người dùng" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      return res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Lỗi cập nhật thông tin" });
    }
  },
  updateAvatar: async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "Không có ảnh nào được chọn" });
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
  },
  deleteUser: async (req, res) => {
    try {
      await User.findById(req.params.id);
      res.json({ message: "Xóa người dùng thành công" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi xóa người dùng" });
    }
  },
  sendFriendRequest: async (req, res) => {
    try {
      const receiver = await User.findById(req.params.id);
      if (!receiver)
        return res.status(404).json({ error: "Người dùng không tồn tại" });
      if (receiver.friendRequests.includes(req.user.id))
        return res.status(400).json({ error: "Đã gửi lời mời kết bạn" });
      if (receiver.friends.includes(req.user.id))
        return res.status(400).json({ error: "Đã là bạn bè" });
      if (!receiver.friendRequests.includes(req.user.id)) {
        receiver.friendRequests.push(req.user.id);
        await receiver.save();
      }

      res.json({ message: "Lời mời kết bạn đã được gửi" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi gửi lời mời kết bạn" });
    }
  },
  acceptFriendRequest: async (req, res) => {
    try {
      // Tìm người gửi lời mời kết bạn
      const sender = await User.findById(req.params.id);
      if (!sender)
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      const user = await User.findById(req.user.id);
      if (!user.friendRequests.includes(req.params.id))
        return res.status(400).json({ error: "Không có lời mời kết bạn" });
      // Thêm người gửi lời mời vào danh sách bạn bè của người nhận
      await User.findByIdAndUpdate(req.user.id, {
        $push: { friends: req.params.id },
        $pull: { friendRequests: req.params.id },
      });
      // Thêm người dùng hiện tại vào danh sách bạn bè của người gửi lời mời
      await sender.updateOne({
        $push: { friends: req.user.id },
      });
      res.json({ message: "Chấp nhận lời mời kết bạn thành công" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi chấp nhận lời mời kết bạn" });
    }
  },
  rejectFriendRequest: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user.friendRequests.includes(req.params.id))
        return res.status(400).json({ error: "Không có lời mời kết bạn" });
      // Xóa lời mời kết bạn
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { friendRequests: req.params.id },
      });
      res.json({ message: "Từ chối lời mời kết bạn thành công" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi từ chối lời mời kết bạn" });
    }
  },
  getUserFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate(
        "friends",
        "username avatar"
      );
      if (!user)
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      res.json(user.friends);
    } catch (error) {
      res.status(500).json({ error: "Lỗi lấy danh sách bạn bè" });
    }
  },
  getUserFriendRequests: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate(
        "friendRequests",
        "username avatar"
      );
      if (!user)
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      res.json(user.friendRequests);
    } catch (error) {
      res.status(500).json({ error: "Lỗi lấy danh sách lời mời kết bạn" });
    }
  },
  deleteFriend: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const friend = await User.findById(req.params.id);
      if (!friend)
        return res.status(404).json({ error: "Không tìm thấy người dùng" });
      if (!user.friends.includes(req.params.id))
        return res.status(400).json({ error: "Không phải là bạn bè" });
      // Xóa bạn bè
      user.friends = user.friends.filter(
        (friend) => friend.toString() !== req.params.id
      );
      friend.friends = friend.friends.filter(
        (friend) => friend.toString() !== req.user.id
      );
      await user.save();
      await friend.save();
      res.json({ message: "Xóa bạn bè thành công" });
    } catch (error) {
      res.status(500).json({ error: "Lỗi xóa bạn bè" });
    }
  },
  searchUser: async (req, res) => {
    try {
      const { username } = req.query;
      const currentUserId = req.user.id; // Lấy _id của người dùng hiện tại

      // Nếu không có username hoặc username là chuỗi rỗng, trả về mảng rỗng
      if (!username || username.trim() === "") {
        return res.json([]);
      }

      const users = await User.find({
        username: { $regex: username, $options: "i" },
        _id: { $ne: currentUserId }, // Loại bỏ chính mình
      });

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Lỗi tìm kiếm người dùng" });
    }
  },
};
module.exports = userController;
