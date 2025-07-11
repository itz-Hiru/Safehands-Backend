import express from "express";
import {
  getAllServices,
  searchServices,
  getServiceById,
} from "../controllers/serviceController.controller.js";
import { protect } from "../middleware/authMiddleware.middleware.js";

const router = express.Router();

// Get all services
router.get("/", getAllServices);
// Search services
router.get("/search", protect, searchServices);
// Get service by Id
router.get("/:serviceId", protect, getServiceById);

export default router;
