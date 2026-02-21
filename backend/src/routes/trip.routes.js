const express = require("express");

const router = express.Router();

const tripController = require("../controllers/trip.controller");


// Create Trip
router.post(
    "/",
    tripController.createTrip
);


// Get All Trips
router.get(
    "/",
    tripController.getAllTrips
);


// Dispatch Trip
router.patch(
    "/:id/dispatch",
    tripController.dispatchTrip
);


// Complete Trip
router.patch(
    "/:id/complete",
    tripController.completeTrip
);


// Delete Trip
router.delete(
    "/:id",
    tripController.deleteTrip
);


module.exports = router;