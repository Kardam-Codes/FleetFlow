const express = require("express");

const router = express.Router();

const maintenanceController = require("../controllers/maintenance.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");


// Create Maintenance Log
router.post(
    "/",
    protect,
    authorize("manager"),
    maintenanceController.createMaintenanceLog
);


// Get All Maintenance Logs
router.get(
    "/",
    protect,
    maintenanceController.getAllMaintenanceLogs
);


// Get Logs By Vehicle
router.get(
    "/vehicle/:vehicleId",
    protect,
    maintenanceController.getMaintenanceLogsByVehicle
);


// Complete Maintenance (Vehicle becomes AVAILABLE)
router.patch(
    "/vehicle/:vehicleId/complete",
    protect,
    authorize("manager"),
    maintenanceController.completeMaintenance
);


// Delete Maintenance Log
router.delete(
    "/:id",
    protect,
    authorize("manager"),
    maintenanceController.deleteMaintenanceLog
);


module.exports = router;
