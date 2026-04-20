const express = require("express");
const router = express.Router();

const { login, signup, getMe, changePassword } = require("../controllers/Auth");
const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getMe);
router.put("/change-password", auth, changePassword);
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
