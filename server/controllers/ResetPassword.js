const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const { resetPassword: resetPasswordTemplate } = require("../mail/templates/resetPasswordTemplate");

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
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Create reset link
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontendUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    // Send email with reset link
    await mailSender(
      email,
      "Reset Your Password",
      resetPasswordTemplate(user.name || "User", resetLink),
    );

    return res.status(200).json({
      success: true,
      message: "Reset link sent to your email",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error sending reset link" });
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