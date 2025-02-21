const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

refreshTokens = [];
const authController = {
    // REGISTER
    register: async (req, res) => {
        try {
            if (!req.body.username || !req.body.email || !req.body.password) {
                return res.status(400).json("All fields are required");
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Create User
            const newUser = new User({
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
    // GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
    },
    // GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "30d" }
        );
    },
    // LOGIN
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            console.log(req.body.email);
            if (!user) {
                return res.status(404).json("User not found");
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json("Wrong password");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                res.cookie("refreshToken", refreshToken, {
                  httpOnly: true,
                  secure: false,
                  path: "/",
                  sameSite: "strict",
                });
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    logout: async (req, res) => {
        try {
          // Kiểm tra xem cookie có tồn tại không
          if (!req.cookies.refreshToken) {
            return res.status(400).json("No refresh token found");
          }
      
          // Xóa cookie
          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
      
          // Xóa refresh token khỏi danh sách
          refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
          );
      
          return res.status(200).json("User has been logged out");
        } catch (error) {
          return res.status(500).json(error);
        }
      },
    me: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select("-password");
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Lỗi lấy thông tin" });
        }
    },
    refresh: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You are not authenticated");
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          err && console.log(err);
          const newAccessToken = authController.generateAccessToken(user);
          const newRefreshToken = authController.generateRefreshToken(user);
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          })
         res.status(200).json({ accessToken: newAccessToken });
        });
    },
};

module.exports = authController;