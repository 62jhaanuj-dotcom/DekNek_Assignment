const express = require("express");
const app = express();

// Import Routes
const authRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");

// Import Configs
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Import Middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

// Load Environment Variables
dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to Database and Cloudinary
database.connect();
cloudinaryConnect();

// --- Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet()); // For security headers

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
// File Upload Middleware 
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// --- Routes ---
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

// Default Route/Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is up and running!",
  });
});

// --- Error Handling ---

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong on our side!",
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});