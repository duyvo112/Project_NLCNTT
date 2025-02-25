const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getLatestNews } = require("../controllers/exploreController");

router.get("/latest-news", authMiddleware.verifyToken, getLatestNews);

module.exports = router;
