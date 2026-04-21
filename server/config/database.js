const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
  const mongoUrl =
    process.env.MONGODB_URL || process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!mongoUrl) {
    console.error(
      "DB Connection Failed: Missing MONGODB_URL in server/.env",
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error);
    process.exit(1);
  }
};


