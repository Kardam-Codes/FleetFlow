const tripModel = require("../models/trip.model");
const db = require("../database/db");

const {
    validateTripCreate,
    validateTripComplete
} = require("../validations/trip.validation");


// ==============================
// Create Trip
// ==============================
const createTrip = async ({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer
}) => {

    // Validate input
    try {
        validateTripCreate({
            vehicle_id,
            driver_id,
            cargo_weight,
            start_odometer
        });
    } catch (err) {
        err.status = 400;
        throw err;
    }


    // Check vehicle exists
    const vehicleResult = await db.query(
        `SELECT * FROM vehicles WHERE id = $1`,
        [vehicle_id]
    );

    const vehicle = vehicleResult.rows[0];

    if (!vehicle) {
        const error = new Error("Vehicle not found");
        error.status = 404;
        throw error;
    }


    // Check vehicle availability
    if (vehicle.status !== "AVAILABLE") {
        const error = new Error(
            "Vehicle is not available"
        );
        error.status = 400;
        throw error;
    }


    // Check driver exists
    const driverResult = await db.query(
        `SELECT * FROM drivers WHERE id = $1`,
        [driver_id]
    );

    const driver = driverResult.rows[0];

    if (!driver) {
        const error = new Error("Driver not found");
        error.status = 404;
        throw error;
    }


    // Check driver availability
    if (driver.status !== "ON_DUTY") {
        const error = new Error(
            "Driver is not available"
        );
        error.status = 400;
        throw error;
    }


    // Check license expiry
    const today = new Date();

    if (new Date(driver.license_expiry) < today) {
        const error = new Error(
            "Driver license is expired"
        );
        error.status = 400;
        throw error;
    }


    // Check cargo capacity
    if (cargo_weight > vehicle.max_capacity) {
        const error = new Error(
            "Cargo weight exceeds vehicle capacity"
        );
        error.status = 400;
        throw error;
    }


    // Create trip
    const trip = await tripModel.createTrip({
        vehicle_id,
        driver_id,
        cargo_weight,
        start_odometer
    });

    if (!trip) {
        const error = new Error("Failed to create trip");
        error.status = 500;
        throw error;
    }

    return trip;
};



// ==============================
// Complete Trip
// ==============================
const completeTrip = async ({
    tripId,
    end_odometer,
    revenue
}) => {

    if (!tripId) {
        const error = new Error("Trip ID is required");
        error.status = 400;
        throw error;
    }


    // Validate input
    try {
        validateTripComplete({
            end_odometer,
            revenue
        });
    } catch (err) {
        err.status = 400;
        throw err;
    }


    // Check trip exists
    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        const error = new Error("Trip not found");
        error.status = 404;
        throw error;
    }


    // Check status
    if (trip.status !== "DISPATCHED") {
        const error = new Error(
            "Trip must be DISPATCHED to complete"
        );
        error.status = 400;
        throw error;
    }


    // Complete trip
    const completedTrip =
        await tripModel.completeTrip({
            tripId,
            end_odometer,
            revenue
        });

    if (!completedTrip) {
        const error = new Error(
            "Failed to complete trip"
        );
        error.status = 500;
        throw error;
    }

    return completedTrip;
};



// ==============================
// Get All Trips
// ==============================
const getAllTrips = async () => {

    const trips = await tripModel.getAllTrips();

    return trips || [];
};



// ==============================
// Dispatch Trip
// ==============================
const dispatchTrip = async (tripId) => {

    if (!tripId) {
        const error = new Error("Trip ID is required");
        error.status = 400;
        throw error;
    }


    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        const error = new Error("Trip not found");
        error.status = 404;
        throw error;
    }


    if (trip.status !== "DRAFT") {
        const error = new Error(
            "Only DRAFT trips can be dispatched"
        );
        error.status = 400;
        throw error;
    }


    const dispatchedTrip =
        await tripModel.dispatchTrip(tripId);

    if (!dispatchedTrip) {
        const error = new Error(
            "Failed to dispatch trip"
        );
        error.status = 500;
        throw error;
    }

    return dispatchedTrip;
};



// ==============================
// Delete Trip
// ==============================
const deleteTrip = async (tripId) => {

    if (!tripId) {
        const error = new Error("Trip ID is required");
        error.status = 400;
        throw error;
    }


    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        const error = new Error("Trip not found");
        error.status = 404;
        throw error;
    }


    const deletedTrip =
        await tripModel.deleteTrip(tripId);

    if (!deletedTrip) {
        const error = new Error(
            "Failed to delete trip"
        );
        error.status = 500;
        throw error;
    }

    return deletedTrip;
};



// ==============================
module.exports = {
    createTrip,
    completeTrip,
    getAllTrips,
    dispatchTrip,
    deleteTrip
};