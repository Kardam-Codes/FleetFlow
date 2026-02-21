const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

const asyncHandler = require("../utils/asyncHandler");

// Fuel Efficiency (km/L)
router.get(
    "/vehicle/:vehicleId/fuel-efficiency",
    asyncHandler(analyticsController.getFuelEfficiency)
);


// Operational Cost (Fuel + Maintenance)
router.get(
    "/vehicle/:vehicleId/operational-cost",
    asyncHandler(analyticsController.getOperationalCost)
);


// Cost per KM
router.get(
    "/vehicle/:vehicleId/cost-per-km",
    asyncHandler(analyticsController.getCostPerKm)
);


// Vehicle ROI
router.get(
    "/vehicle/:vehicleId/roi",
    asyncHandler(analyticsController.getVehicleROI)
);


module.exports = router;