const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const mailSender = require("../utils/mailSender");
const {
  emailVerification,
} = require("../mail/templates/emailVerificationTemplate");

// function to generate 6 digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==================== SEND OTP ====================
exports.sendOTP = async (req, res) => {
  try {
    const { name, email } = req.body;

    // check email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // generate OTP
    const otp = generateOTP();

    // delete old OTP if exists
    await OTP.findOneAndDelete({ email });

    // save new OTP
    await OTP.create({ email, otp });

    // send email
    await mailSender(
      email,
      "Verify your email",
      emailVerification(name || "User", otp),
    );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error sending OTP" });
  }
};

// ==================== SIGNUP ====================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, otp, role } = req.body;
    const selectedRole = (role || "student").toLowerCase();

    // check required fields
    if (!name || !email || !password || !otp) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (!["student", "admin"].includes(selectedRole)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (selectedRole === "admin") {
      const adminExists = await User.exists({ role: "admin" });
      if (adminExists) {
        return res.status(400).json({
          message: "Admin account already exists. Please sign up as student.",
        });
      }
    }

    // get latest OTP
    const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!latestOTP) {
      return res.status(400).json({ message: "OTP not found" });
    }

    // check OTP match
    if (latestOTP.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create profile (empty for now)
    const profile = await Profile.create({});

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: selectedRole,
      additionalDetails: profile._id,
    });

    // delete OTP after use
    await OTP.deleteMany({ email });

    // generate JWT token for auto-login
    const token = jwt.sign(
      { id: newUser._id, role: selectedRole },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000 && err.keyPattern?.role) {
      return res.status(400).json({
        message: "Admin account already exists. Please sign up as student.",
      });
    }
    return res.status(500).json({ message: "Signup error" });
  }
};

// ==================== LOGIN ====================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (!user.role) {
      user.role = "student";
      await user.save();
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Login error" });
  }
};

// ==================== GET CURRENT USER ====================
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("additionalDetails");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching user" });
  }
};

// ==================== CHANGE PASSWORD ====================
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // check fields

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // get user
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error changing password" });
  }
};
