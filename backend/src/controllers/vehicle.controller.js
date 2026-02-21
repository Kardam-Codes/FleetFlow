// backend/src/controllers/vehicle.controller.js

import {
  createVehicleService,
  getAllVehiclesService,
  changeVehicleStatusService,
  updateVehicleDetailsService,
} from "../services/vehicle.service.js";

export const createVehicle = async (req, res, next) => {
  try {
    const { name, licensePlate, maxCapacity, acquisitionCost } = req.body;

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

export const getVehicles = async (req, res, next) => {
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

export const changeVehicleStatus = async (req, res, next) => {
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

export const updateVehicleDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, maxCapacity, acquisitionCost } = req.body;

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