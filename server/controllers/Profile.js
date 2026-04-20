const Profile = require("../models/Profile");
const User = require("../models/User");

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, about, contactNumber } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId).populate("additionalDetails");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update user
    if (name) user.name = name;

    // update profile
    const profile = user.additionalDetails;
    if (about) profile.about = about;
    if (contactNumber) profile.contactNumber = contactNumber;

    await user.save();
    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("additionalDetails");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};