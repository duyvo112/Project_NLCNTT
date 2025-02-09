const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
      try {
        if (!req.body.username || !req.body.email || !req.body.password) {
          return res.status(400).json("All fields are required");
        }
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
  
        //Create User
        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashed,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
      } catch (err) {
        return res.status(500).json(err);
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