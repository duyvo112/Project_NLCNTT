const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(401).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated");
    }
  },
  verifyTokenAndUserAuthorization: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  },
  verifyTokenAndUserPostAuthorization: async (req, res, next) => {
    authMiddleware.verifyToken(req, res, async () => {
      try {
        const post = await Post.findById(req.params.id);
        if (!post) {
          return res.status(404).json("Post not found");
        }
        console.log(req.user.isAdmin);
        if (post.user.toString() === req.user.id || req.user.isAdmin) {
          next();
        } else {
          return res.status(403).json("You're not allowed to do that!");
        }
      } catch (error) {
        return res.status(500).json("Internal Server Error");
      }
    });
  },
  verifyTokenAndCommentAuthorization: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      console.log("req.user.id: " + req.user.id);
      console.log("ownerId: :" + req.body.ownerId);
      if (
        req.user.id === req.body.ownerId ||
        req.user.isAdmin ||
        req.user.id === req.body.postId
      ) {
        next();
      } else {
        return res.status(403).json("You're not allowed to do that!");
      }
    });
  },
};
module.exports = authMiddleware;
