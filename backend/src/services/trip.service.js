const tripModel = require("../models/trip.model");
const db = require("../database/db");

const {
    validateTripCreate,
    validateTripComplete
} = require("../../validations/trip.validation");


function createError(message, statusCode = 400) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}


// Create Trip
const createTrip = async ({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer
}) => {

    validateTripCreate({
        vehicle_id,
        driver_id,
        cargo_weight,
        start_odometer
    });

    const vehicleResult = await db.query(
        `SELECT * FROM vehicles WHERE id = $1`,
        [vehicle_id]
    );

    const vehicle = vehicleResult.rows[0];

    if (!vehicle) {
        throw createError("Vehicle not found", 404);
    }

    if (vehicle.status !== "AVAILABLE") {
        throw createError("Vehicle is not available", 400);
    }

    const driverResult = await db.query(
        `SELECT * FROM drivers WHERE id = $1`,
        [driver_id]
    );

    const driver = driverResult.rows[0];

    if (!driver) {
        throw createError("Driver not found", 404);
    }

    if (driver.status !== "ON_DUTY") {
        throw createError("Driver is not available", 400);
    }

    const today = new Date();

    if (new Date(driver.license_expiry) < today) {
        throw createError("Driver license is expired", 400);
    }

    if (cargo_weight > vehicle.max_capacity) {
        throw createError("Cargo weight exceeds vehicle capacity", 400);
    }

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

    validateTripComplete({
        end_odometer,
        revenue
    });

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw createError("Trip not found", 404);
    }

    if (trip.status !== "DISPATCHED") {
        throw createError("Trip must be DISPATCHED to complete", 400);
    }

    const completedTrip = await tripModel.completeTrip({
        tripId,
        end_odometer,
        revenue
    });

    await db.query(
        `UPDATE vehicles SET status = 'AVAILABLE', odometer = $1 WHERE id = $2`,
        [end_odometer, trip.vehicle_id]
    );

    await db.query(
        `UPDATE drivers SET status = 'ON_DUTY' WHERE id = $1`,
        [trip.driver_id]
    );

    return completedTrip;
};


// Get All Trips
const getAllTrips = async () => {

    return await tripModel.getAllTrips();
};


// Dispatch Trip
const dispatchTrip = async (tripId) => {

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw createError("Trip not found", 404);
    }

    if (trip.status !== "DRAFT") {
        throw createError("Only DRAFT trips can be dispatched", 400);
    }

    const updatedTrip = await tripModel.dispatchTrip(tripId);

    await db.query(
        `UPDATE vehicles SET status = 'ON_TRIP' WHERE id = $1`,
        [trip.vehicle_id]
    );

    await db.query(
        `UPDATE drivers SET status = 'ON_DUTY' WHERE id = $1`,
        [trip.driver_id]
    );

    return updatedTrip;
};


// Cancel Trip
const cancelTrip = async (tripId) => {

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw createError("Trip not found", 404);
    }

    if (!["DRAFT", "DISPATCHED"].includes(trip.status)) {
        throw createError("Only DRAFT or DISPATCHED trips can be cancelled", 400);
    }

    const updatedTrip = await tripModel.cancelTrip(tripId);

    await db.query(
        `UPDATE vehicles SET status = 'AVAILABLE' WHERE id = $1`,
        [trip.vehicle_id]
    );

    await db.query(
        `UPDATE drivers SET status = 'ON_DUTY' WHERE id = $1`,
        [trip.driver_id]
    );

    return updatedTrip;
};


// Delete Trip
const deleteTrip = async (tripId) => {

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw createError("Trip not found", 404);
    }

    if (trip.status === "DISPATCHED") {
        throw createError("Cannot delete a DISPATCHED trip. Cancel it first.", 400);
    }

    return await tripModel.deleteTrip(tripId);
};


module.exports = {
    createTrip,
    completeTrip,
    getAllTrips,
    dispatchTrip,
    cancelTrip,
    deleteTrip
};
