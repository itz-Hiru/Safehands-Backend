import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.config.js";
import authRoutes from "./routes/authRoutes.routes.js";
import doctorRoutes from "./routes/doctorRoutes.routes.js";
import serviceRoutes from "./routes/serviceRoutes.routes.js";
import bookingRoutes from "./routes/bookingRoutes.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // Authentication Routes
app.use("/api/doctors", doctorRoutes); // Doctor Routes
app.use("/api/services", serviceRoutes); // Service Routes
app.use("/api/bookings", bookingRoutes); // Booking Routes

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
