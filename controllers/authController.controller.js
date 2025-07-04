import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Description -> Register/ Signup User
// Route       -> /api/auth/register
// Access      -> Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminAccessToken } =
      req.body;

    // Check if user is already exist with the same email
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ message: "User already exists with same email" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check for admin access token
    let role = "User";
    if (adminAccessToken) {
      if (!adminAccessToken == process.env.ADMIN_ACCESS_TOKEN) {
        return res.status(400).json({ message: "Invalid access token" });
      }
      role = "Admin";
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
