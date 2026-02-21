const express = require("express");

const router = express.Router();

const fuelController = require("../controllers/fuel.controller");


// Create Fuel Log
router.post(
    "/",
    fuelController.createFuelLog
);


// Get All Fuel Logs
router.get(
    "/",
    fuelController.getAllFuelLogs
);


// Get Fuel Logs By Trip
router.get(
    "/trip/:tripId",
    fuelController.getFuelLogsByTrip
);


// Get Total Fuel Cost By Vehicle
router.get(
    "/vehicle/:vehicleId/total-cost",
    fuelController.getTotalFuelCostByVehicle
);


// Delete Fuel Log
router.delete(
    "/:id",
    fuelController.deleteFuelLog
);


module.exports = router;