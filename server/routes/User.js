const express = require("express");
const router = express.Router();

// Controllers
const { login, signup, getMe, changePassword, sendOTP } = require("../controllers/Auth");
const { resetPassword, resetPasswordToken } = require("../controllers/ResetPassword");

// Middleware (IMPORT ONLY ONCE)
const { auth, isAdmin, isStudent } = require("../middlewares/auth");

// Dummy Controllers (you must define these)
const adminController = (req, res) => {
  res.json({ message: "Welcome Admin" });
};

const studentController = (req, res) => {
  res.json({ message: "Welcome Student" });
};

// Protected Routes
router.get("/admin-dashboard", auth, isAdmin, adminController);
router.get("/student-dashboard", auth, isStudent, studentController);

// Auth Routes
router.post("/sendotp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getMe);
router.put("/change-password", auth, changePassword);

// Reset Password
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;