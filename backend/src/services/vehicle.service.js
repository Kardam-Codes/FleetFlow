const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicleStatus,
  updateVehicleDetails,
} = require("../models/vehicle.model");

// Allowed state transitions
const allowedTransitions = {
  AVAILABLE: ["ON_TRIP", "IN_SHOP", "RETIRED"],
  ON_TRIP: ["AVAILABLE"],
  IN_SHOP: ["AVAILABLE"],
  RETIRED: [],
};

// Create vehicle
const createVehicleService = async (
  name,
  licensePlate,
  maxCapacity,
  acquisitionCost
) => {
  return await createVehicle(name, licensePlate, maxCapacity, acquisitionCost);
};

// Get all vehicles
const getAllVehiclesService = async () => {
  return await getAllVehicles();
};

// Change vehicle status (with state validation)
const changeVehicleStatusService = async (id, newStatus) => {
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  const currentStatus = String(vehicle.status || "").toUpperCase();
  const nextStatus = String(newStatus || "").toUpperCase();

  if (!allowedTransitions[currentStatus] || !allowedTransitions[currentStatus].includes(nextStatus)) {
    const error = new Error(
      `Invalid status transition from ${currentStatus} to ${nextStatus}`
    );
    error.statusCode = 400;
    throw error;
  }

  return await updateVehicleStatus(id, nextStatus);
};

// Update vehicle basic details
const updateVehicleDetailsService = async (
  id,
  name,
  maxCapacity,
  acquisitionCost
) => {
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    const error = new Error("Vehicle not found");
    error.statusCode = 404;
    throw error;
  }

  return await updateVehicleDetails(id, name, maxCapacity, acquisitionCost);
};

module.exports = {
  createVehicleService,
  getAllVehiclesService,
  changeVehicleStatusService,
  updateVehicleDetailsService,
};
