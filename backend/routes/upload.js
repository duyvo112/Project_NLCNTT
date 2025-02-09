const uploadController = require('../controllers/uploadController');
const upload = require('../config/Multer');
const router = require('express').Router();


// @route POST /api/upload
router.post('/',upload.single("image"), uploadController.upload);

module.exports = router;
