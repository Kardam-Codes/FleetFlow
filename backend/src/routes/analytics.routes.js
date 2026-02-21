const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");


// Dashboard overview
router.get(
    "/dashboard",
    protect,
    authorize("manager", "financial_analyst", "dispatcher", "safety_officer"),
    analyticsController.getDashboardStats
);


// Fleet Fuel Efficiency (km/L)
router.get(
    "/fuel-efficiency",
    protect,
    authorize("manager", "financial_analyst"),
    analyticsController.getFleetFuelEfficiency
);


// Fleet ROI
router.get(
    "/roi",
    protect,
    authorize("manager", "financial_analyst"),
    analyticsController.getFleetROI
);


// Fleet Cost per KM
router.get(
    "/cost-per-km",
    protect,
    authorize("manager", "financial_analyst"),
    analyticsController.getFleetCostPerKm
);


// Monthly payroll CSV export
router.get(
    "/reports/payroll.csv",
    protect,
    authorize("manager", "financial_analyst"),
    analyticsController.exportPayrollCsv
);


// Monthly health audit CSV export
router.get(
    "/reports/health.csv",
    protect,
    authorize("manager", "financial_analyst"),
    analyticsController.exportHealthAuditCsv
);


// Fuel Efficiency by vehicle (km/L)
router.get(
    "/vehicle/:vehicleId/fuel-efficiency",
    protect,
    analyticsController.getFuelEfficiency
);


// Operational Cost (Fuel + Maintenance) by vehicle
router.get(
    "/vehicle/:vehicleId/operational-cost",
    protect,
    analyticsController.getOperationalCost
);


// Cost per KM by vehicle
router.get(
    "/vehicle/:vehicleId/cost-per-km",
    protect,
    analyticsController.getCostPerKm
);


// Vehicle ROI
router.get(
    "/vehicle/:vehicleId/roi",
    protect,
    analyticsController.getVehicleROI
);


module.exports = router;
