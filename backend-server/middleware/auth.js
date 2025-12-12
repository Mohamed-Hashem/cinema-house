const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.slice(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken };
