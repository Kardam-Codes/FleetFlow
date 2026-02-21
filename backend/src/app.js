const express = require("express");
const cors = require("cors");


// ==============================
// Import Routes
// ==============================

const driverRoutes = require("./routes/driver.routes");
const tripRoutes = require("./routes/trip.routes");
const maintenanceRoutes = require("./routes/maintenance.routes");
const fuelRoutes = require("./routes/fuel.routes");
const analyticsRoutes = require("./routes/analytics.routes");


// ==============================
// Import Middlewares
// ==============================

const errorMiddleware = require("./middlewares/error.middleware");


// ==============================
// Create Express App
// ==============================

const app = express();


// ==============================
// Global Middlewares
// ==============================

// Enable CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));


// ==============================
// Health Check Route
// ==============================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "FleetFlow API is running"
    });
});


// ==============================
// Register Routes
// ==============================

app.use("/api/drivers", driverRoutes);

app.use("/api/trips", tripRoutes);

app.use("/api/maintenance", maintenanceRoutes);

app.use("/api/fuel", fuelRoutes);

app.use("/api/analytics", analyticsRoutes);


// ==============================
// 404 Route Handler
// ==============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// ==============================
// Global Error Middleware
// MUST be last middleware
// ==============================

app.use(errorMiddleware);


// ==============================
// Export App
// ==============================

module.exports = app;