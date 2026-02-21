const db = require("../database/db");


// Create Fuel Log
const createFuelLog = async ({
    trip_id,
    liters,
    cost,
    fuel_date
}) => {

    const query = `
        INSERT INTO fuel_logs (
            trip_id,
            liters,
            cost,
            fuel_date
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        trip_id,
        liters,
        cost,
        fuel_date
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};



// Get All Fuel Logs
const getAllFuelLogs = async () => {

    const query = `
        SELECT 
            fuel_logs.*,
            trips.vehicle_id
        FROM fuel_logs
        LEFT JOIN trips
        ON fuel_logs.trip_id = trips.id
        ORDER BY fuel_logs.created_at DESC;
    `;

    const result = await db.query(query);

    return result.rows;
};



// Get Fuel Logs By Trip
const getFuelLogsByTrip = async (tripId) => {

    const query = `
        SELECT *
        FROM fuel_logs
        WHERE trip_id = $1
        ORDER BY created_at DESC;
    `;

    const result = await db.query(query, [tripId]);

    return result.rows;
};



// Get Fuel Log By ID
const getFuelLogById = async (logId) => {

    const query = `
        SELECT *
        FROM fuel_logs
        WHERE id = $1;
    `;

    const result = await db.query(query, [logId]);

    return result.rows[0];
};



// Delete Fuel Log
const deleteFuelLog = async (logId) => {

    const query = `
        DELETE FROM fuel_logs
        WHERE id = $1
        RETURNING *;
    `;

    const result = await db.query(query, [logId]);

    return result.rows[0];
};



// Calculate Total Fuel Cost By Vehicle
const getTotalFuelCostByVehicle = async (vehicleId) => {

    const query = `
        SELECT SUM(fuel_logs.cost) AS total_fuel_cost
        FROM fuel_logs
        JOIN trips ON fuel_logs.trip_id = trips.id
        WHERE trips.vehicle_id = $1;
    `;

    const result = await db.query(query, [vehicleId]);

    return result.rows[0];
};



module.exports = {
    createFuelLog,
    getAllFuelLogs,
    getFuelLogsByTrip,
    getFuelLogById,
    deleteFuelLog,
    getTotalFuelCostByVehicle
};