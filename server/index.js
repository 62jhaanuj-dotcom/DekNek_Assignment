// ========================
// IMPORTS
// ========================
const express = require("express");
const app = express();

// Routes
const authRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");

// Configs
const database = require("./config/database");

// Middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");

// ========================
// ENV CONFIG
// ========================
dotenv.config();
const PORT = process.env.PORT || 5000;

// ========================
// SECURITY MIDDLEWARES
// ========================
app.set("trust proxy", 1); // Required for deployment (Render/Vercel)

app.use(helmet());

// ========================
// BODY PARSING
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ========================
// CORS CONFIG (SMART)
// ========================
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL].filter(Boolean)
    : ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ========================
// ROUTES
// ========================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", profileRoutes);

// ========================
// HEALTH CHECK
// ========================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
  });
});

// ========================
// 404 HANDLER
// ========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ========================
// GLOBAL ERROR HANDLER
// ========================
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ========================
// START SERVER
// ========================
const startServer = async () => {
  await database.connect();

  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== "production") {
      console.log(`Server running on http://localhost:${PORT}`);
    }
  });
};

startServer();
