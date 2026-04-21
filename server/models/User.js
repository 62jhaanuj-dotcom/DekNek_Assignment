const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // 🔥 hides password by default
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    // profile reference
    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    },

    // auth fields
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

userSchema.index(
  { role: 1 },
  { unique: true, partialFilterExpression: { role: "admin" } }
);

module.exports = mongoose.model("User", userSchema);
