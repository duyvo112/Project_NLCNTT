const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');

const authMiddleware = {
    verifyToken : async (req, res, next) => {
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
          if (req.user.id === req.params.id.trim() || req.user.isAdmin) {
            next();
          } else {
            return res.status(403).json("You're not allowed to do that!");
          }
        });
      },
      
}
module.exports = authMiddleware;