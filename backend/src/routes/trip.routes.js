const express = require("express");

const router = express.Router();

const tripController = require("../controllers/trip.controller");

const asyncHandler = require("../utils/asyncHandler");

// Create Trip
router.post(
    "/",
    asyncHandler(tripController.createTrip)
);


// Get All Trips
router.get(
    "/",
    asyncHandler(tripController.getAllTrips)
);


// Dispatch Trip
router.patch(
    "/:id/dispatch",
    asyncHandler(tripController.dispatchTrip)
);


// Complete Trip
router.patch(
    "/:id/complete",
    asyncHandler(tripController.completeTrip)
);


// Delete Trip
router.delete(
    "/:id",
    asyncHandler(tripController.deleteTrip)
);


module.exports = router;