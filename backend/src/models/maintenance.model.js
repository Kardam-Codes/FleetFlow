const db = require("../database/db");


// Create Maintenance Log
const createMaintenanceLog = async ({
    vehicle_id,
    description,
    cost,
    service_date
}) => {

    const query = `
        INSERT INTO maintenance_logs (
            vehicle_id,
            description,
            cost,
            service_date
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        vehicle_id,
        description,
        cost,
        service_date
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};



// Get All Maintenance Logs
const getAllMaintenanceLogs = async () => {

    const query = `
        SELECT 
            maintenance_logs.*,
            vehicles.license_plate
        FROM maintenance_logs
        LEFT JOIN vehicles 
        ON maintenance_logs.vehicle_id = vehicles.id
        ORDER BY maintenance_logs.created_at DESC;
    `;

    const result = await db.query(query);

    return result.rows;
};



// Get Maintenance Logs By Vehicle
const getMaintenanceLogsByVehicle = async (vehicleId) => {

    const query = `
        SELECT *
        FROM maintenance_logs
        WHERE vehicle_id = $1
        ORDER BY created_at DESC;
    `;

    const result = await db.query(query, [vehicleId]);

    return result.rows;
};



// Get Maintenance Log By ID
const getMaintenanceLogById = async (logId) => {

    const query = `
        SELECT *
        FROM maintenance_logs
        WHERE id = $1;
    `;

    const result = await db.query(query, [logId]);

    return result.rows[0];
};



// Delete Maintenance Log
const deleteMaintenanceLog = async (logId) => {

    const query = `
        DELETE FROM maintenance_logs
        WHERE id = $1
        RETURNING *;
    `;

    const result = await db.query(query, [logId]);

    return result.rows[0];
};



module.exports = {
    createMaintenanceLog,
    getAllMaintenanceLogs,
    getMaintenanceLogsByVehicle,
    getMaintenanceLogById,
    deleteMaintenanceLog
};