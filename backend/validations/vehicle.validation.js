const validateCreateVehicle = (req, res, next) => {
  const name = req.body.name;
  const licensePlate = req.body.licensePlate ?? req.body.license_plate;
  const maxCapacity = req.body.maxCapacity ?? req.body.max_capacity;
  const acquisitionCost = req.body.acquisitionCost ?? req.body.acquisition_cost;

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

  req.body.name = name || licensePlate;
  req.body.licensePlate = licensePlate;
  req.body.maxCapacity = Number(maxCapacity);
  req.body.acquisitionCost = Number(acquisitionCost || 0);
  next();
};

const validateVehicleStatus = (req, res, next) => {
  const { status } = req.body;

  const allowedStatuses = ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"];
  const normalizedStatus = String(status || "").toUpperCase();

  if (!status || !allowedStatuses.includes(normalizedStatus)) {
    return res.status(400).json({
      success: false,
      message: "Invalid vehicle status",
    });
  }

  req.body.status = normalizedStatus;
  next();
};

module.exports = {
  validateCreateVehicle,
  validateVehicleStatus,
};
