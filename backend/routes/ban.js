const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const banController = require("../controllers/banController");

router.post(
  "/",
  authMiddleware.verifyTokenAndBanAuthorization,
  banController.banUser
);

router.post(
  "/check-banned",
  authMiddleware.verifyToken,
  banController.checkBanned
);

module.exports = router;
