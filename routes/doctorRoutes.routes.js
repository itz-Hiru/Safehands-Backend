import express from "express";
import {
  createService,
  editService,
  deleteService,
  getDoctorServices,
} from "../controllers/doctorController.controller.js";
import { adminOnly, protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

// Create service
router.post("/:doctorId/services", protect, adminOnly, createService);
// Edit service
router.put("/:doctorId/services/:serviceId", protect, editService);
// Delete service
router.delete(
  "/:doctorId/services/:serviceId",
  protect,
  adminOnly,
  deleteService
);
// Get all services for a doctor
router.get("/:doctorId/services", protect, getDoctorServices);
// Check doctor availability
router.get("/:doctorId/availability", protect, getDoctorAvailability);

export default router;
