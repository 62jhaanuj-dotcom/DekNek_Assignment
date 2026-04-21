const jwt = require("jsonwebtoken");

//  AUTH (verify token)
exports.auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    const token =
      req.cookies?.token ||
      (authHeader ? authHeader.replace("Bearer ", "") : null);

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

//  ADMIN CHECK
exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

//  STUDENT CHECK
exports.isStudent = (req, res, next) => {
  if (!req.user || req.user.role !== "student") {
    return res.status(403).json({ message: "Student access required" });
  }
  next();
};