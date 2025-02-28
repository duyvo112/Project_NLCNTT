const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { getMessages } = require("../controllers/messagesController");

router.get("/:user1/:user2", authMiddleware.verifyToken, getMessages);
module.exports = router;
