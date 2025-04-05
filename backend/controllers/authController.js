const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

refreshTokens = [];
const REFRESH_TOKEN_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000;
const authController = {
  // REGISTER
  register: async (req, res) => {
    try {
      console.log("req.body", req.body);
      if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.fullname
      ) {
        return res.status(400).json("All fields are required");
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create User
      const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
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
      { expiresIn: REFRESH_TOKEN_EXPIRE_TIME }
    );
  },
  // LOGIN
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json("User not found");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json("Wrong password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          withCredentials: true,
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "None",
          maxAge: REFRESH_TOKEN_EXPIRE_TIME,
        });
        const { password, isAdmin, ...others } = user._doc;
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
        withCredentials: true,
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "None",
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

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json("Refresh token is not valid");

        try {
          const user = await User.findById(decoded.id); // Tìm user theo ID từ token
          if (!user) return res.status(404).json("User not found");

          // Tạo Access Token mới với dữ liệu từ user
          const newAccessToken = authController.generateAccessToken(user);
          const newRefreshToken = authController.generateRefreshToken(user);

          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });

          return res.status(200).json({ accessToken: newAccessToken });
        } catch (error) {
          return res.status(500).json(error);
        }
      }
    );
  },
};

module.exports = authController;
