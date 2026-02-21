const express = require("express");

const router = express.Router();

const driverController = require("../controllers/driver.controller");

const asyncHandler = require("../utils/asyncHandler");

// Create Driver
router.post(
    "/",
    asyncHandler(driverController.createDriver)
);


// Get All Drivers
router.get(
    "/",
    asyncHandler(driverController.getAllDrivers)
);


// Get Driver By ID
router.get(
    "/:id",
    asyncHandler(driverController.getDriverById)
);


// Update Driver Status
router.patch(
    "/:id/status",
    asyncHandler(driverController.updateDriverStatus)
);


// Delete Driver
router.delete(
    "/:id",
    asyncHandler(driverController.deleteDriver)
);


module.exports = router;