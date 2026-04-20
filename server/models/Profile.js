const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    about: String,
    contactNumber: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", profileSchema);
