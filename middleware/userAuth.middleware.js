// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No or invalid token format" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure JWT_SECRET is set
    console.log(decoded);
    

    // Use decoded.id if you signed token like jwt.sign({ id: user._id }, ...)
    const user = await User.findById(decoded.id || decoded._id);

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;