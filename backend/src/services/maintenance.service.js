const maintenanceModel = require("../models/maintenance.model");
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



// Create Maintenance Log (FleetFlow critical logic)
const createMaintenanceLog = async ({
    vehicle_id,
    description,
    cost,
    service_date
}) => {

    if (!vehicle_id || !description) {
        throw new Error("vehicle_id and description are required");
    }


    // Check vehicle exists
    const vehicle = await getVehicleById(vehicle_id);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }


    // Create maintenance log
    const log = await maintenanceModel.createMaintenanceLog({
        vehicle_id,
        description,
        cost,
        service_date
    });


    // IMPORTANT FleetFlow rule:
    // Vehicle automatically becomes IN_SHOP

    await db.query(
        `
        UPDATE vehicles
        SET status = 'IN_SHOP'
        WHERE id = $1;
        `,
        [vehicle_id]
    );


    return log;
};



// Get All Maintenance Logs
const getAllMaintenanceLogs = async () => {

    return await maintenanceModel.getAllMaintenanceLogs();
};



// Get Logs By Vehicle
const getMaintenanceLogsByVehicle = async (vehicleId) => {

    return await maintenanceModel.getMaintenanceLogsByVehicle(vehicleId);
};



// Complete Maintenance (Vehicle becomes AVAILABLE again)
const completeMaintenance = async (vehicleId) => {

    const vehicle = await getVehicleById(vehicleId);

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }


    await db.query(
        `
        UPDATE vehicles
        SET status = 'AVAILABLE'
        WHERE id = $1;
        `,
        [vehicleId]
    );


    return {
        message: "Vehicle maintenance completed",
        vehicle_id: vehicleId
    };
};



// Delete Maintenance Log
const deleteMaintenanceLog = async (logId) => {

    return await maintenanceModel.deleteMaintenanceLog(logId);
};



module.exports = {
    createMaintenanceLog,
    getAllMaintenanceLogs,
    getMaintenanceLogsByVehicle,
    completeMaintenance,
    deleteMaintenanceLog
};