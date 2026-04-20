const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Send reset token
exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    // simple response instead of mail
    res.status(200).json({
      success: true,
      token, // for testing
      message: "Reset token generated",
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating token" });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ token });
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.token = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Reset failed" });
  }
};