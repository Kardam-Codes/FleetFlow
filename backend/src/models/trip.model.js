const db = require("../database/db");


// Create Trip
const createTrip = async ({
    vehicle_id,
    driver_id,
    cargo_weight,
    status = "DRAFT",
    start_odometer = null,
    revenue = null
}) => {

    const query = `
        INSERT INTO trips (
            vehicle_id,
            driver_id,
            cargo_weight,
            status,
            start_odometer,
            revenue
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;

    const values = [
        vehicle_id,
        driver_id,
        cargo_weight,
        status,
        start_odometer,
        revenue
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};



// Get All Trips
const getAllTrips = async () => {

    const query = `
        SELECT
            trips.*,
            vehicles.license_plate AS vehicle_name,
            vehicles.license_plate,
            drivers.name AS driver_name
        FROM trips
        LEFT JOIN vehicles ON trips.vehicle_id = vehicles.id
        LEFT JOIN drivers ON trips.driver_id = drivers.id
        ORDER BY trips.created_at DESC;
    `;

    const result = await db.query(query);

    return result.rows;
};



// Get Trip By ID
const getTripById = async (tripId) => {

    const query = `
        SELECT *
        FROM trips
        WHERE id = $1;
    `;

    const result = await db.query(query, [tripId]);

    return result.rows[0];
};



// Update Trip Status
const updateTripStatus = async (tripId, status) => {

    const query = `
        UPDATE trips
        SET status = $1
        WHERE id = $2
        RETURNING *;
    `;

    const result = await db.query(query, [status, tripId]);

    return result.rows[0];
};



// Dispatch Trip
const dispatchTrip = async (tripId) => {

    return await updateTripStatus(tripId, "DISPATCHED");
};



// Complete Trip
const completeTrip = async ({
    tripId,
    end_odometer,
    revenue
}) => {

    const query = `
        UPDATE trips
        SET
            status = 'COMPLETED',
            end_odometer = $1,
            revenue = $2
        WHERE id = $3
        RETURNING *;
    `;

    const values = [
        end_odometer,
        revenue,
        tripId
    ];

    const result = await db.query(query, values);

    return result.rows[0];
};



// Cancel Trip
const cancelTrip = async (tripId) => {

    return await updateTripStatus(tripId, "CANCELLED");
};



// Delete Trip
const deleteTrip = async (tripId) => {

    const query = `
        DELETE FROM trips
        WHERE id = $1
        RETURNING *;
    `;

    const result = await db.query(query, [tripId]);

    return result.rows[0];
};



module.exports = {
    createTrip,
    getAllTrips,
    getTripById,
    updateTripStatus,
    dispatchTrip,
    completeTrip,
    cancelTrip,
    deleteTrip
};
