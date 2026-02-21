const fuelService = require("../services/fuel.service");


// Create Fuel Log
const createFuelLog = async (req, res, next) => {
    try {

        const {
            trip_id,
            liters,
            cost,
            fuel_date
        } = req.body;

        const log = await fuelService.createFuelLog({
            trip_id,
            liters,
            cost,
            fuel_date
        });

        res.status(201).json({
            success: true,
            message: "Fuel log created successfully",
            data: log
        });

    } catch (error) {
        next(error);
    }
};



// Get All Fuel Logs
const getAllFuelLogs = async (req, res, next) => {
    try {

        const logs = await fuelService.getAllFuelLogs();

        res.status(200).json({
            success: true,
            data: logs
        });

    } catch (error) {
        next(error);
    }
};



// Get Fuel Logs By Trip
const getFuelLogsByTrip = async (req, res, next) => {
    try {

        const { tripId } = req.params;

        const logs = await fuelService.getFuelLogsByTrip(tripId);

        res.status(200).json({
            success: true,
            data: logs
        });

    } catch (error) {
        next(error);
    }
};



// Delete Fuel Log
const deleteFuelLog = async (req, res, next) => {
    try {

        const { id } = req.params;

        const log = await fuelService.deleteFuelLog(id);

        res.status(200).json({
            success: true,
            message: "Fuel log deleted successfully",
            data: log
        });

    } catch (error) {
        next(error);
    }
};



// Get Total Fuel Cost By Vehicle
const getTotalFuelCostByVehicle = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const result = await fuelService.getTotalFuelCostByVehicle(vehicleId);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogsByTrip,
    deleteFuelLog,
    getTotalFuelCostByVehicle
};