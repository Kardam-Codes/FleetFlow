const db = require("../database/db");


// Create Driver
const createDriver = async ({ name, license_number, license_expiry }) => {
    const query = `
        INSERT INTO drivers (
            name,
            license_number,
            license_expiry
        )
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const values = [
        name,
        license_number,
        license_expiry
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};



// Get All Drivers
const getAllDrivers = async () => {
    const query = `
        SELECT *
        FROM drivers
        ORDER BY created_at DESC;
    `;

    const result = await db.query(query);

    return result.rows;
};



// Get Driver By ID (UUID)
const getDriverById = async (driverId) => {
    const query = `
        SELECT *
        FROM drivers
        WHERE id = $1;
    `;

    const result = await db.query(query, [driverId]);

    return result.rows[0];
};



// Update Driver Status
const updateDriverStatus = async (driverId, status) => {
    const query = `
        UPDATE drivers
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [status, driverId]);

    return result.rows[0];
};



// Update Safety Score
const updateSafetyScore = async (driverId, safetyScore) => {
    const query = `
        UPDATE drivers
        SET safety_score = $1
        WHERE id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [safetyScore, driverId]);

    return result.rows[0];
};



// Delete Driver
const deleteDriver = async (driverId) => {
    const query = `
        DELETE FROM drivers
        WHERE id = $1
        RETURNING *;
    `;

    const result = await db.query(query, [driverId]);

    return result.rows[0];
};



module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriverStatus,
    updateSafetyScore,
    deleteDriver
};