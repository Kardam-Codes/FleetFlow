const pool = require("../database/db");

// Create vehicle
const createVehicle = async (
  name,
  licensePlate,
  maxCapacity,
  acquisitionCost,
  odometer = 0
) => {
  const query = `
    INSERT INTO vehicles (license_plate, max_capacity, acquisition_cost, odometer)
    VALUES ($1, $2, $3, $4)
    RETURNING id, license_plate, max_capacity, acquisition_cost, odometer, status, created_at
  `;

  const values = [licensePlate, maxCapacity, acquisitionCost, odometer];

  const result = await pool.query(query, values);

  return {
    ...result.rows[0],
    name: name || result.rows[0].license_plate,
  };
};

// Get all vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`
    SELECT id, license_plate, max_capacity, acquisition_cost, odometer, status, created_at,
           license_plate AS name
    FROM vehicles
    ORDER BY created_at DESC
  `);
  return result.rows;
};

// Get vehicle by ID
const getVehicleById = async (id) => {
  const result = await pool.query(
    `
    SELECT id, license_plate, max_capacity, acquisition_cost, odometer, status, created_at,
           license_plate AS name
    FROM vehicles
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
};

// Update vehicle status
const updateVehicleStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET status = $1
     WHERE id = $2
     RETURNING id, license_plate, max_capacity, acquisition_cost, odometer, status, created_at`,
    [status, id]
  );

  return result.rows[0];
};

// Update vehicle basic details
const updateVehicleDetails = async (
  id,
  name,
  maxCapacity,
  acquisitionCost
) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET max_capacity = $1,
         acquisition_cost = $2
     WHERE id = $3
     RETURNING id, license_plate, max_capacity, acquisition_cost, odometer, status, created_at`,
    [maxCapacity, acquisitionCost, id]
  );

  return {
    ...result.rows[0],
    name: name || result.rows[0]?.license_plate,
  };
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleStatus,
  updateVehicleDetails,
};
