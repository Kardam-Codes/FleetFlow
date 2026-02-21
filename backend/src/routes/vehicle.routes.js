// backend/src/routes/vehicle.routes.js

import express from "express";
import {
  createVehicle,
  getVehicles,
  changeVehicleStatus,
  updateVehicleDetails,
} from "../controllers/vehicle.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

import {
  validateCreateVehicle,
  validateVehicleStatus,
} from "../validations/vehicle.validation.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("manager"),
  validateCreateVehicle,
  createVehicle
);

router.get("/", protect, getVehicles);

router.patch(
  "/:id/status",
  protect,
  authorize("manager"),
  validateVehicleStatus,
  changeVehicleStatus
);

router.patch(
  "/:id",
  protect,
  authorize("manager"),
  validateCreateVehicle,
  updateVehicleDetails
);

export default router;