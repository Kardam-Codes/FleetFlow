const tripService = require("../services/trip.service");


// Create Trip
const createTrip = async (req, res, next) => {
    try {

        const {
            vehicle_id,
            driver_id,
            cargo_weight,
            start_odometer
        } = req.body;

        const trip = await tripService.createTrip({
            vehicle_id,
            driver_id,
            cargo_weight,
            start_odometer
        });

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            data: trip
        });

    } catch (error) {
        next(error);
    }
};



// Get All Trips
const getAllTrips = async (req, res, next) => {
    try {

        const trips = await tripService.getAllTrips();

        res.status(200).json({
            success: true,
            data: trips
        });

    } catch (error) {
        next(error);
    }
};



// Dispatch Trip
const dispatchTrip = async (req, res, next) => {
    try {

        const { id } = req.params;

        const trip = await tripService.dispatchTrip(id);

        res.status(200).json({
            success: true,
            message: "Trip dispatched successfully",
            data: trip
        });

    } catch (error) {
        next(error);
    }
};



// Complete Trip
const completeTrip = async (req, res, next) => {
    try {

        const { id } = req.params;

        const {
            end_odometer,
            revenue
        } = req.body;

        const trip = await tripService.completeTrip({
            tripId: id,
            end_odometer,
            revenue
        });

        res.status(200).json({
            success: true,
            message: "Trip completed successfully",
            data: trip
        });

    } catch (error) {
        next(error);
    }
};



// Delete Trip
const deleteTrip = async (req, res, next) => {
    try {

        const { id } = req.params;

        const trip = await tripService.deleteTrip(id);

        res.status(200).json({
            success: true,
            message: "Trip deleted successfully",
            data: trip
        });

    } catch (error) {
        next(error);
    }
};


// Cancel Trip
const cancelTrip = async (req, res, next) => {
    try {

        const { id } = req.params;

        const trip = await tripService.cancelTrip(id);

        res.status(200).json({
            success: true,
            message: "Trip cancelled successfully",
            data: trip
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    createTrip,
    getAllTrips,
    dispatchTrip,
    completeTrip,
    cancelTrip,
    deleteTrip
};
