import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/authController.controller.js";
import { protect } from "../middleware/authMiddleware.middleware.js";
import upload from "../middleware/uploadMiddleware.middleware.js";

const router = express.Router();

// Regiter/ Signup User
router.post("/register", registerUser);
// Login user
router.post("/login", loginUser);

// Upload image
router.post("/upload/image", upload.single("image"), (req, res) => {
  // Check  if file is uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Create image url
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imageUrl });
});

export default router;
