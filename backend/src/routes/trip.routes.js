const express = require("express");

const router = express.Router();

const tripController = require("../controllers/trip.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");


// Create Trip
router.post(
    "/",
    protect,
    authorize("manager", "dispatcher"),
    tripController.createTrip
);


// Get All Trips
router.get(
    "/",
    protect,
    tripController.getAllTrips
);


// Dispatch Trip
router.patch(
    "/:id/dispatch",
    protect,
    authorize("manager", "dispatcher"),
    tripController.dispatchTrip
);


// Complete Trip
router.patch(
    "/:id/complete",
    protect,
    authorize("manager", "dispatcher"),
    tripController.completeTrip
);


// Cancel Trip
router.patch(
    "/:id/cancel",
    protect,
    authorize("manager", "dispatcher"),
    tripController.cancelTrip
);


// Delete Trip
router.delete(
    "/:id",
    protect,
    authorize("manager", "dispatcher"),
    tripController.deleteTrip
);


module.exports = router;
