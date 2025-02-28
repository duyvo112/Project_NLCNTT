const userController = require("../controllers/userController");
const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../config/Multer");

// Update User Avatar
router.put(
  "/update-avatar",
  authMiddleware.verifyToken,
  upload.single("image"),
  userController.updateAvatar
);

// Update User
router.put(
  "/:id",
  authMiddleware.verifyTokenAndUserAuthorization,
  userController.updateUser
);

// Search User

router.get("/search", authMiddleware.verifyToken, userController.searchUser);

// Get User
router.get("/:id", userController.getUser);

// Delete User
router.delete(
  "/:id",
  authMiddleware.verifyTokenAndUserAuthorization,
  userController.deleteUser
);

// Send Friend Request

router.put(
  "/send-request/:id",
  authMiddleware.verifyToken,
  userController.sendFriendRequest
);

// Accept Friend Request

router.put(
  "/accept-request/:id",
  authMiddleware.verifyToken,
  userController.acceptFriendRequest
);
module.exports = router;

// Reject Friend Request

router.put(
  "/reject-request/:id",
  authMiddleware.verifyToken,
  userController.rejectFriendRequest
);

// Get User Friends

router.get(
  "/friends/:id",
  authMiddleware.verifyToken,
  userController.getUserFriends
);

// Get User Friend Requests

router.get(
  "/friend-requests/:id",
  authMiddleware.verifyToken,
  userController.getUserFriendRequests
);

// Delete Friend

router.put(
  "/delete-friend/:id",
  authMiddleware.verifyToken,
  userController.deleteFriend
);
