const maintenanceService = require("../services/maintenance.service");


// Create Maintenance Log
const createMaintenanceLog = async (req, res, next) => {
    try {

        const {
            vehicle_id,
            description,
            cost,
            service_date
        } = req.body;

        const log = await maintenanceService.createMaintenanceLog({
            vehicle_id,
            description,
            cost,
            service_date
        });

        res.status(201).json({
            success: true,
            message: "Maintenance log created, vehicle moved to IN_SHOP",
            data: log
        });

    } catch (error) {
        next(error);
    }
};



// Get All Maintenance Logs
const getAllMaintenanceLogs = async (req, res, next) => {
    try {

        const logs = await maintenanceService.getAllMaintenanceLogs();

        res.status(200).json({
            success: true,
            data: logs
        });

    } catch (error) {
        next(error);
    }
};



// Get Logs By Vehicle
const getMaintenanceLogsByVehicle = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const logs = await maintenanceService.getMaintenanceLogsByVehicle(vehicleId);

        res.status(200).json({
            success: true,
            data: logs
        });

    } catch (error) {
        next(error);
    }
};



// Complete Maintenance
const completeMaintenance = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const result = await maintenanceService.completeMaintenance(vehicleId);

        res.status(200).json({
            success: true,
            message: "Maintenance completed, vehicle AVAILABLE",
            data: result
        });

    } catch (error) {
        next(error);
    }
};



// Delete Maintenance Log
const deleteMaintenanceLog = async (req, res, next) => {
    try {

        const { id } = req.params;

        const log = await maintenanceService.deleteMaintenanceLog(id);

        res.status(200).json({
            success: true,
            message: "Maintenance log deleted",
            data: log
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    createMaintenanceLog,
    getAllMaintenanceLogs,
    getMaintenanceLogsByVehicle,
    completeMaintenance,
    deleteMaintenanceLog
};