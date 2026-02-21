const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");


// Fuel Efficiency (km/L)
router.get(
    "/vehicle/:vehicleId/fuel-efficiency",
    analyticsController.getFuelEfficiency
);


// Operational Cost (Fuel + Maintenance)
router.get(
    "/vehicle/:vehicleId/operational-cost",
    analyticsController.getOperationalCost
);


// Cost per KM
router.get(
    "/vehicle/:vehicleId/cost-per-km",
    analyticsController.getCostPerKm
);


// Vehicle ROI
router.get(
    "/vehicle/:vehicleId/roi",
    analyticsController.getVehicleROI
);


module.exports = router;