// backend/src/app.js

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Enable CORS (allows frontend to call backend)
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Root health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FleetFlow API is running 🚛",
  });
});

// Register routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;