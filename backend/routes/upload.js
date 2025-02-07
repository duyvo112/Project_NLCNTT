const uploadController = require('../controllers/uploadController');
const router = require('express').Router();

const multer = require("multer");
const cloudinary = require("../config/Cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: { folder: "mini-social-network" },
  });
  const upload = multer({ storage });
  

// @route POST /api/upload
router.post('/',upload.single("image"), uploadController.upload);

module.exports = router;
