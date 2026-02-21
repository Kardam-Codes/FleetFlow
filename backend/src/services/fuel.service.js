const fuelModel = require("../models/fuel.model");
const tripModel = require("../models/trip.model");


// Create Fuel Log
const createFuelLog = async ({
    trip_id,
    liters,
    cost,
    fuel_date
}) => {

    if (!trip_id || !liters || !cost) {
        throw new Error("trip_id, liters, and cost are required");
    }


    // Check trip exists
    const trip = await tripModel.getTripById(trip_id);

    if (!trip) {
        throw new Error("Trip not found");
    }


    // Optional FleetFlow rule:
    // Allow fuel logs only for DISPATCHED or COMPLETED trips

    if (
        trip.status !== "DISPATCHED" &&
        trip.status !== "COMPLETED"
    ) {
        throw new Error(
            "Fuel log allowed only for DISPATCHED or COMPLETED trips"
        );
    }


    // Create fuel log
    const log = await fuelModel.createFuelLog({
        trip_id,
        liters,
        cost,
        fuel_date
    });


    return log;
};



// Get All Fuel Logs
const getAllFuelLogs = async () => {

    return await fuelModel.getAllFuelLogs();
};



// Get Fuel Logs By Trip
const getFuelLogsByTrip = async (tripId) => {

    return await fuelModel.getFuelLogsByTrip(tripId);
};



// Delete Fuel Log
const deleteFuelLog = async (logId) => {

    return await fuelModel.deleteFuelLog(logId);
};



// Calculate Total Fuel Cost By Vehicle
const getTotalFuelCostByVehicle = async (vehicleId) => {

    const result = await fuelModel.getTotalFuelCostByVehicle(vehicleId);

    return {
        vehicle_id: vehicleId,
        total_fuel_cost: result.total_fuel_cost || 0
    };
};



module.exports = {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogsByTrip,
    deleteFuelLog,
    getTotalFuelCostByVehicle
}; 