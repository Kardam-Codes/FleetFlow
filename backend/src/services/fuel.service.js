const fuelModel = require("../models/fuel.model");
const tripModel = require("../models/trip.model");


// ==============================
// Create Fuel Log
// ==============================
const createFuelLog = async ({
    trip_id,
    liters,
    cost,
    fuel_date
}) => {

    // Validate required fields
    if (!trip_id) {
        const error = new Error("Trip ID is required");
        error.status = 400;
        throw error;
    }

    if (liters == null || liters <= 0) {
        const error = new Error("Liters must be greater than 0");
        error.status = 400;
        throw error;
    }

    if (cost == null || cost < 0) {
        const error = new Error("Cost must be 0 or greater");
        error.status = 400;
        throw error;
    }


    // Check trip exists
    const trip = await tripModel.getTripById(trip_id);

    if (!trip) {
        const error = new Error("Trip not found");
        error.status = 404;
        throw error;
    }


    // FleetFlow business rule
    if (
        trip.status !== "DISPATCHED" &&
        trip.status !== "COMPLETED"
    ) {
        const error = new Error(
            "Fuel log allowed only for DISPATCHED or COMPLETED trips"
        );
        error.status = 400;
        throw error;
    }


    // Create fuel log
    const log = await fuelModel.createFuelLog({
        trip_id,
        liters,
        cost,
        fuel_date
    });

    if (!log) {
        const error = new Error("Failed to create fuel log");
        error.status = 500;
        throw error;
    }

    return log;
};



// ==============================
// Get All Fuel Logs
// ==============================
const getAllFuelLogs = async () => {

    const logs = await fuelModel.getAllFuelLogs();

    return logs || [];
};



// ==============================
// Get Fuel Logs By Trip
// ==============================
const getFuelLogsByTrip = async (tripId) => {

    if (!tripId) {
        const error = new Error("Trip ID is required");
        error.status = 400;
        throw error;
    }

    const logs = await fuelModel.getFuelLogsByTrip(tripId);

    return logs || [];
};



// ==============================
// Delete Fuel Log
// ==============================
const deleteFuelLog = async (logId) => {

    if (!logId) {
        const error = new Error("Fuel log ID is required");
        error.status = 400;
        throw error;
    }

    const deletedLog = await fuelModel.deleteFuelLog(logId);

    if (!deletedLog) {
        const error = new Error("Fuel log not found");
        error.status = 404;
        throw error;
    }

    return deletedLog;
};



// ==============================
// Get Total Fuel Cost By Vehicle
// ==============================
const getTotalFuelCostByVehicle = async (vehicleId) => {

    if (!vehicleId) {
        const error = new Error("Vehicle ID is required");
        error.status = 400;
        throw error;
    }

    const result =
        await fuelModel.getTotalFuelCostByVehicle(vehicleId);

    return {
        vehicle_id: vehicleId,
        total_fuel_cost:
            result?.total_fuel_cost || 0
    };
};



// ==============================
module.exports = {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogsByTrip,
    deleteFuelLog,
    getTotalFuelCostByVehicle
};