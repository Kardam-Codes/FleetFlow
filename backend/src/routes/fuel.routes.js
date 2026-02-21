const express = require("express");

const router = express.Router();

const fuelController = require("../controllers/fuel.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");


// Create Fuel Log
router.post(
    "/",
    protect,
    authorize("manager", "financial_analyst"),
    fuelController.createFuelLog
);


// Get All Fuel Logs
router.get(
    "/",
    protect,
    fuelController.getAllFuelLogs
);


// Get Fuel Logs By Trip
router.get(
    "/trip/:tripId",
    protect,
    fuelController.getFuelLogsByTrip
);


// Get Total Fuel Cost By Vehicle
router.get(
    "/vehicle/:vehicleId/total-cost",
    protect,
    fuelController.getTotalFuelCostByVehicle
);


// Delete Fuel Log
router.delete(
    "/:id",
    protect,
    authorize("manager", "financial_analyst"),
    fuelController.deleteFuelLog
);


module.exports = router;
