const maintenanceModel = require("../models/maintenance.model");
const db = require("../database/db");


// ==============================
// Helper: Get vehicle by ID
// ==============================
const getVehicleById = async (vehicleId) => {

    if (!vehicleId) {
        const error = new Error("Vehicle ID is required");
        error.status = 400;
        throw error;
    }

    const query = `
        SELECT *
        FROM vehicles
        WHERE id = $1;
    `;

    const result = await db.query(query, [vehicleId]);

    return result.rows[0];
};



// ==============================
// Create Maintenance Log
// FleetFlow Rule: Vehicle → IN_SHOP
// ==============================
const createMaintenanceLog = async ({
    vehicle_id,
    description,
    cost,
    service_date
}) => {

    // Validate required fields
    if (!vehicle_id) {
        const error = new Error("Vehicle ID is required");
        error.status = 400;
        throw error;
    }

    if (!description || description.trim() === "") {
        const error = new Error("Maintenance description is required");
        error.status = 400;
        throw error;
    }

    if (cost != null && cost < 0) {
        const error = new Error("Maintenance cost cannot be negative");
        error.status = 400;
        throw error;
    }


    // Check vehicle exists
    const vehicle = await getVehicleById(vehicle_id);

    if (!vehicle) {
        const error = new Error("Vehicle not found");
        error.status = 404;
        throw error;
    }


    // Create maintenance log
    const log = await maintenanceModel.createMaintenanceLog({
        vehicle_id,
        description,
        cost,
        service_date
    });

    if (!log) {
        const error = new Error("Failed to create maintenance log");
        error.status = 500;
        throw error;
    }


    // FleetFlow rule:
    // Vehicle automatically becomes IN_SHOP

    const updateResult = await db.query(
        `
        UPDATE vehicles
        SET status = 'IN_SHOP'
        WHERE id = $1
        RETURNING *;
        `,
        [vehicle_id]
    );

    if (!updateResult.rows[0]) {
        const error = new Error("Failed to update vehicle status");
        error.status = 500;
        throw error;
    }


    return log;
};



// ==============================
// Get All Maintenance Logs
// ==============================
const getAllMaintenanceLogs = async () => {

    const logs =
        await maintenanceModel.getAllMaintenanceLogs();

    return logs || [];
};



// ==============================
// Get Maintenance Logs By Vehicle
// ==============================
const getMaintenanceLogsByVehicle = async (vehicleId) => {

    if (!vehicleId) {
        const error = new Error("Vehicle ID is required");
        error.status = 400;
        throw error;
    }

    const logs =
        await maintenanceModel.getMaintenanceLogsByVehicle(vehicleId);

    return logs || [];
};



// ==============================
// Complete Maintenance
// FleetFlow Rule: Vehicle → AVAILABLE
// ==============================
const completeMaintenance = async (vehicleId) => {

    if (!vehicleId) {
        const error = new Error("Vehicle ID is required");
        error.status = 400;
        throw error;
    }


    // Check vehicle exists
    const vehicle = await getVehicleById(vehicleId);

    if (!vehicle) {
        const error = new Error("Vehicle not found");
        error.status = 404;
        throw error;
    }


    // Update vehicle status
    const result = await db.query(
        `
        UPDATE vehicles
        SET status = 'AVAILABLE'
        WHERE id = $1
        RETURNING *;
        `,
        [vehicleId]
    );

    if (!result.rows[0]) {
        const error = new Error("Failed to update vehicle status");
        error.status = 500;
        throw error;
    }


    return {
        message: "Vehicle maintenance completed",
        vehicle_id: vehicleId,
        status: "AVAILABLE"
    };
};



// ==============================
// Delete Maintenance Log
// ==============================
const deleteMaintenanceLog = async (logId) => {

    if (!logId) {
        const error = new Error("Maintenance log ID is required");
        error.status = 400;
        throw error;
    }

    const deletedLog =
        await maintenanceModel.deleteMaintenanceLog(logId);

    if (!deletedLog) {
        const error = new Error("Maintenance log not found");
        error.status = 404;
        throw error;
    }

    return deletedLog;
};



// ==============================
module.exports = {
    createMaintenanceLog,
    getAllMaintenanceLogs,
    getMaintenanceLogsByVehicle,
    completeMaintenance,
    deleteMaintenanceLog
};