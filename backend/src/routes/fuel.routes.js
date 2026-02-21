const express = require("express");

const router = express.Router();

const fuelController = require("../controllers/fuel.controller");

const asyncHandler = require("../utils/asyncHandler");

// Create Fuel Log
router.post(
    "/",
    asynchandler(fuelController.createFuelLog)
);


// Get All Fuel Logs
router.get(
    "/",
    asyncHandler(fuelController.getAllFuelLogs)
);


// Get Fuel Logs By Trip
router.get(
    "/trip/:tripId",
    asyncHandler(fuelController.getFuelLogsByTrip)
);


// Get Total Fuel Cost By Vehicle
router.get(
    "/vehicle/:vehicleId/total-cost",
    asyncHandler(fuelController.getTotalFuelCostByVehicle)
);


// Delete Fuel Log
router.delete(
    "/:id",
    asyncHandler(fuelController.deleteFuelLog)
);


module.exports = router;