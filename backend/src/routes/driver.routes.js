const express = require("express");

const router = express.Router();

const driverController = require("../controllers/driver.controller");


// Create Driver
router.post(
    "/",
    driverController.createDriver
);


// Get All Drivers
router.get(
    "/",
    driverController.getAllDrivers
);


// Get Driver By ID
router.get(
    "/:id",
    driverController.getDriverById
);


// Update Driver Status
router.patch(
    "/:id/status",
    driverController.updateDriverStatus
);


// Delete Driver
router.delete(
    "/:id",
    driverController.deleteDriver
);


module.exports = router;