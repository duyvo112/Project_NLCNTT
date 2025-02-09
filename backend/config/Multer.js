const multer = require("multer");
const cloudinary = require("../config/Cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "mini-social-network/posts" },
  });
  const upload = multer({ storage });
  
module.exports = upload;