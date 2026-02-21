const express = require("express");

const router = express.Router();

const driverController = require("../controllers/driver.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");


// Create Driver
router.post(
    "/",
    protect,
    authorize("manager", "safety_officer"),
    driverController.createDriver
);


// Get All Drivers
router.get(
    "/",
    protect,
    driverController.getAllDrivers
);


// Get Driver By ID
router.get(
    "/:id",
    protect,
    driverController.getDriverById
);


// Update Driver Status
router.patch(
    "/:id/status",
    protect,
    authorize("manager", "safety_officer"),
    driverController.updateDriverStatus
);


// Delete Driver
router.delete(
    "/:id",
    protect,
    authorize("manager"),
    driverController.deleteDriver
);


module.exports = router;
