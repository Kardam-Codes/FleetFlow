const express = require("express");

const router = express.Router();

const maintenanceController = require("../controllers/maintenance.controller");

const asyncHandler = require("../utils/asyncHandler");

// Create Maintenance Log
router.post(
    "/",
    asyncHandler(maintenanceController.createMaintenanceLog)
);


// Get All Maintenance Logs
router.get(
    "/",
    asyncHandler(maintenanceController.getAllMaintenanceLogs)
);


// Get Logs By Vehicle
router.get(
    "/vehicle/:vehicleId",
    asyncHandler(maintenanceController.getMaintenanceLogsByVehicle)
);


// Complete Maintenance (Vehicle becomes AVAILABLE)
router.patch(
    "/vehicle/:vehicleId/complete",
    asyncHandler(maintenanceController.completeMaintenance)
);


// Delete Maintenance Log
router.delete(
    "/:id",
    asyncHandler(maintenanceController.deleteMaintenanceLog)
);


module.exports = router;