const express = require("express");

const router = express.Router();

const maintenanceController = require("../controllers/maintenance.controller");


// Create Maintenance Log
router.post(
    "/",
    maintenanceController.createMaintenanceLog
);


// Get All Maintenance Logs
router.get(
    "/",
    maintenanceController.getAllMaintenanceLogs
);


// Get Logs By Vehicle
router.get(
    "/vehicle/:vehicleId",
    maintenanceController.getMaintenanceLogsByVehicle
);


// Complete Maintenance (Vehicle becomes AVAILABLE)
router.patch(
    "/vehicle/:vehicleId/complete",
    maintenanceController.completeMaintenance
);


// Delete Maintenance Log
router.delete(
    "/:id",
    maintenanceController.deleteMaintenanceLog
);


module.exports = router;