const {
  createVehicleService,
  getAllVehiclesService,
  changeVehicleStatusService,
  updateVehicleDetailsService,
} = require("../services/vehicle.service");

const createVehicle = async (req, res, next) => {
  try {
    const name = req.body.name;
    const licensePlate = req.body.licensePlate ?? req.body.license_plate;
    const maxCapacity = req.body.maxCapacity ?? req.body.max_capacity;
    const acquisitionCost = req.body.acquisitionCost ?? req.body.acquisition_cost;

    const vehicle = await createVehicleService(
      name,
      licensePlate,
      maxCapacity,
      acquisitionCost
    );

    res.status(201).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

const getVehicles = async (req, res, next) => {
  try {
    const vehicles = await getAllVehiclesService();

    res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    next(error);
  }
};

const changeVehicleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const vehicle = await changeVehicleStatusService(id, status);

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

const updateVehicleDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const name = req.body.name;
    const maxCapacity = req.body.maxCapacity ?? req.body.max_capacity;
    const acquisitionCost = req.body.acquisitionCost ?? req.body.acquisition_cost;

    const vehicle = await updateVehicleDetailsService(
      id,
      name,
      maxCapacity,
      acquisitionCost
    );

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  changeVehicleStatus,
  updateVehicleDetails,
};
