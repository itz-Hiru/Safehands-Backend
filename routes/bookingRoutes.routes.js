import express from "express";
import {
  createBooking,
  getBookingsByUser,
  getBookingsByDoctor,
} from "../controllers/bookingController.controller.js";
import { adminOnly, protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

// Create new booking
router.post("/", protect, createBooking);
// Get all bookings for a user
router.get("/user/:userId", protect, getBookingsByUser);
// Get all bookings for a doctor
router.get("/doctor/:doctorId", protect, adminOnly, getBookingsByDoctor);
// Update booking status
router.patch("/:bookingId", protect, adminOnly, updateBookingStatus);

export default router;
