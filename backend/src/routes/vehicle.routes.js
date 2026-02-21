const express = require("express");
const {
  createVehicle,
  getVehicles,
  changeVehicleStatus,
  updateVehicleDetails,
} = require("../controllers/vehicle.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const {
  validateCreateVehicle,
  validateVehicleStatus,
} = require("../../validations/vehicle.validation");

const router = express.Router();

router.post("/", protect, authorize("manager"), validateCreateVehicle, createVehicle);

router.get("/", protect, getVehicles);

router.patch("/:id/status", protect, authorize("manager"), validateVehicleStatus, changeVehicleStatus);

router.patch("/:id", protect, authorize("manager"), validateCreateVehicle, updateVehicleDetails);

module.exports = router;
