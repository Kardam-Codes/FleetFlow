const tripModel = require("../models/trip.model");
const driverModel = require("../models/driver.model");
const db = require("../database/db");


// Helper: Get vehicle by ID
const getVehicleById = async (vehicleId) => {

    const query = `
        SELECT *
        FROM vehicles
        WHERE id = $1;
    `;

    const result = await db.query(query, [vehicleId]);

    return result.rows[0];
};



// Create Trip (FleetFlow critical logic)
const createTrip = async ({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer
}) => {

    if (!vehicle_id || !driver_id || !cargo_weight) {
        throw new Error("vehicle_id, driver_id, cargo_weight required");
    }


    // Check vehicle exists
    const vehicle = await getVehicleById(vehicle_id);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }


    // Check vehicle availability
    if (vehicle.status !== "AVAILABLE") {
        throw new Error("Vehicle not available");
    }


    // Check capacity rule (FleetFlow requirement)
    if (cargo_weight > vehicle.max_capacity) {
        throw new Error("Cargo exceeds vehicle capacity");
    }


    // Check driver exists
    const driver = await driverModel.getDriverById(driver_id);

    if (!driver) {
        throw new Error("Driver not found");
    }


    // Check driver availability
    if (driver.status !== "ON_DUTY") {
        throw new Error("Driver not available");
    }


    // Check license expiry
    const today = new Date();
    const expiryDate = new Date(driver.license_expiry);

    if (expiryDate < today) {
        throw new Error("Driver license expired");
    }


    // Create trip
    const trip = await tripModel.createTrip({
        vehicle_id,
        driver_id,
        cargo_weight,
        status: "DRAFT",
        start_odometer
    });


    return trip;
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
        throw new Error("Only DRAFT trips can be dispatched");
    }


    // Update trip status
    const updatedTrip = await tripModel.updateTripStatus(
        tripId,
        "DISPATCHED"
    );


    // Update vehicle status
    await db.query(
        `UPDATE vehicles SET status = 'ON_TRIP' WHERE id = $1`,
        [trip.vehicle_id]
    );


    // Update driver status
    await db.query(
        `UPDATE drivers SET status = 'OFF_DUTY' WHERE id = $1`,
        [trip.driver_id]
    );


    return updatedTrip;
};



// Complete Trip
const completeTrip = async ({
    tripId,
    end_odometer,
    revenue
}) => {

    const trip = await tripModel.getTripById(tripId);

    if (!trip) {
        throw new Error("Trip not found");
    }


    if (trip.status !== "DISPATCHED") {
        throw new Error("Trip must be DISPATCHED to complete");
    }


    const completedTrip = await tripModel.completeTrip({
        tripId,
        end_odometer,
        revenue
    });


    // Vehicle becomes available again
    await db.query(
        `UPDATE vehicles SET status = 'AVAILABLE' WHERE id = $1`,
        [trip.vehicle_id]
    );


    // Driver becomes available again
    await db.query(
        `UPDATE drivers SET status = 'ON_DUTY' WHERE id = $1`,
        [trip.driver_id]
    );


    return completedTrip;
};



// Delete Trip
const deleteTrip = async (tripId) => {

    return await tripModel.deleteTrip(tripId);
};



module.exports = {
    createTrip,
    getAllTrips,
    dispatchTrip,
    completeTrip,
    deleteTrip
};