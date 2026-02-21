// backend/src/validations/vehicle.validation.js

export const validateCreateVehicle = (req, res, next) => {
  const { name, licensePlate, maxCapacity, acquisitionCost } = req.body;

  if (!name || name.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Vehicle name must be at least 2 characters",
    });
  }

  if (!licensePlate || licensePlate.length < 4) {
    return res.status(400).json({
      success: false,
      message: "License plate must be valid",
    });
  }

  if (!maxCapacity || maxCapacity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Max capacity must be greater than 0",
    });
  }

  if (acquisitionCost < 0) {
    return res.status(400).json({
      success: false,
      message: "Acquisition cost cannot be negative",
    });
  }

  next();
};

export const validateVehicleStatus = (req, res, next) => {
  const { status } = req.body;

  const allowedStatuses = ["available", "on_trip", "in_shop", "retired"];

  if (!status || !allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle status",
    });
  }

  next();
};