import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(400).json({ message: "Not authorized. No token found" });
  }
};

// Middleware to protect admin only routes
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role == "Admin") {
    next();
  } else {
    res
      .status(400)
      .json({ message: "You haven't access to handle this feature" });
  }
};
