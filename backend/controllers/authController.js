const User = require('../models/User');
// const bcrypt = require('bcrypt');

const authController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ username, email, password });
            await newUser.save();
            res.status(201).json({ message: "Đăng ký thành công!" });
          } catch (error) {
            res.status(500).json({ error: "Lỗi đăng ký" });
          }
    },
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
        
            if (!user || user.password !== password) {
              return res.status(400).json({ error: "Email hoặc mật khẩu không đúng" });
            }
        
            res.status(200).json({ message: "Đăng nhập thành công!", user });
          } catch (error) {
            res.status(500).json({ error: "Lỗi đăng nhập" });
          }
    },
    me: async(req, res) => { 
        try {
            const user = await User.findById(req.user.id).select("-password");
            res.json(user);
          } catch (error) {
            res.status(500).json({ error: "Lỗi lấy thông tin" });
          }
    }
}
module.exports = authController;