// backend/src/models/vehicle.model.js

import  pool  from "../database/db.js";

// Create vehicle
export const createVehicle = async (
  name,
  licensePlate,
  maxCapacity,
  acquisitionCost
) => {
  const query = `
    INSERT INTO vehicles (name, license_plate, max_capacity, acquisition_cost)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [name, licensePlate, maxCapacity, acquisitionCost];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// Get all vehicles
export const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles ORDER BY created_at DESC`);
  return result.rows;
};

// Get vehicle by ID
export const getVehicleById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

// Update vehicle status
export const updateVehicleStatus = async (id, status) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0];
};

// Update vehicle basic details
export const updateVehicleDetails = async (
  id,
  name,
  maxCapacity,
  acquisitionCost
) => {
  const result = await pool.query(
    `UPDATE vehicles
     SET name = $1,
         max_capacity = $2,
         acquisition_cost = $3
     WHERE id = $4
     RETURNING *`,
    [name, maxCapacity, acquisitionCost, id]
  );

  return result.rows[0];
};