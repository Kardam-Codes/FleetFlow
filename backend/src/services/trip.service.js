const tripModel = require("../models/trip.model");
const db = require("../database/db");

const {
    validateTripCreate,
    validateTripComplete
} = require("../validations/trip.validation");


// Create Trip
const createTrip = async ({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer
}) => {

    // VALIDATION
    validateTripCreate({
        vehicle_id,
        driver_id,
        cargo_weight,
        start_odometer
    });


    // Check vehicle exists
    const vehicleResult = await db.query(
        `SELECT * FROM vehicles WHERE id = $1`,
        [vehicle_id]
    );

    const vehicle = vehicleResult.rows[0];

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }


    if (vehicle.status !== "AVAILABLE") {
        throw new Error("Vehicle is not available");
    }


    // Check driver exists
    const driverResult = await db.query(
        `SELECT * FROM drivers WHERE id = $1`,
        [driver_id]
    );

    const driver = driverResult.rows[0];

    if (!driver) {
        throw new Error("Driver not found");
    }


    if (driver.status !== "ON_DUTY") {
        throw new Error("Driver is not available");
    }


    // Check license expiry
    const today = new Date();

    if (new Date(driver.license_expiry) < today) {
        throw new Error("Driver license is expired");
    }


    // Check cargo capacity
    if (cargo_weight > vehicle.max_capacity) {
        throw new Error(
            "Cargo weight exceeds vehicle capacity"
        );
    }


    // Create trip
    return await tripModel.createTrip({
        vehicle_id,
        driver_id,
        cargo_weight,
        start_odometer
    });
};



// Complete Trip
const completeTrip = async ({
    tripId,
    end_odometer,
    revenue
}) => {

    // VALIDATION
    validateTripComplete({
        end_odometer,
        revenue
    });


    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw new Error("Trip not found");
    }


    if (trip.status !== "DISPATCHED") {
        throw new Error(
            "Trip must be DISPATCHED to complete"
        );
    }


    return await tripModel.completeTrip({
        tripId,
        end_odometer,
        revenue
    });
};



// Get All Trips
const getAllTrips = async () => {

    return await tripModel.getAllTrips();
};



// Dispatch Trip
const dispatchTrip = async (tripId) => {

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw new Error("Trip not found");
    }


    if (trip.status !== "DRAFT") {
        throw new Error(
            "Only DRAFT trips can be dispatched"
        );
    }


    return await tripModel.dispatchTrip(tripId);
};



// Delete Trip
const deleteTrip = async (tripId) => {

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw new Error("Trip not found");
    }

    return await tripModel.deleteTrip(tripId);
};



module.exports = {
    createTrip,
    completeTrip,
    getAllTrips,
    dispatchTrip,
    deleteTrip
};