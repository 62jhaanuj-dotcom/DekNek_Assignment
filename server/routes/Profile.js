const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { getProfile, updateProfile } = require("../controllers/Profile");

// Get user profile (protected)
router.get("/", auth, getProfile);

// Update profile (protected)
router.put("/", auth, updateProfile);

module.exports = router;
