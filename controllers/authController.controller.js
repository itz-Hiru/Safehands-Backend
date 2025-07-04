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

// Description -> Login User
// Route       -> /api/auth/login
// Access      -> Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user is available for the email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.status(200).json({
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

// Description -> Get user details
// Route       -> /api/auth/get
// Access      -> Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // Check if user is available
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
