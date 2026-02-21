const analyticsService = require("../services/analytics.service");


// Dashboard KPIs
const getDashboardStats = async (req, res, next) => {
    try {

        const { status, vehicleType, region } = req.query;

        const result = await analyticsService.getDashboardStats({
            status,
            vehicleType,
            region
        });

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Fleet Fuel Efficiency
const getFleetFuelEfficiency = async (req, res, next) => {
    try {

        const result = await analyticsService.getFleetFuelEfficiency();

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Fleet ROI
const getFleetROI = async (req, res, next) => {
    try {

        const result = await analyticsService.getFleetROI();

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Fleet Cost per KM
const getFleetCostPerKm = async (req, res, next) => {
    try {

        const result = await analyticsService.getFleetCostPerKm();

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Get Fuel Efficiency
const getFuelEfficiency = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const result =
            await analyticsService.getFuelEfficiencyByVehicle(vehicleId);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Get Operational Cost
const getOperationalCost = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const result =
            await analyticsService.getOperationalCostByVehicle(vehicleId);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Get Cost Per Km
const getCostPerKm = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const result =
            await analyticsService.getCostPerKmByVehicle(vehicleId);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


// Get Vehicle ROI
const getVehicleROI = async (req, res, next) => {
    try {

        const { vehicleId } = req.params;

        const result =
            await analyticsService.getVehicleROI(vehicleId);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        next(error);
    }
};


function resolveMonth(month) {
    if (month && /^\d{4}-\d{2}$/.test(month)) {
        return month;
    }

    const now = new Date();
    const year = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${currentMonth}`;
}


const exportPayrollCsv = async (req, res, next) => {
    try {
        const month = resolveMonth(req.query.month);
        const csv = await analyticsService.getPayrollReportCsv(month);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=\"payroll-${month}.csv\"`);
        res.status(200).send(csv);
    } catch (error) {
        next(error);
    }
};


const exportHealthAuditCsv = async (req, res, next) => {
    try {
        const month = resolveMonth(req.query.month);
        const csv = await analyticsService.getHealthAuditCsv(month);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename=\"health-audit-${month}.csv\"`);
        res.status(200).send(csv);
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getDashboardStats,
    getFleetFuelEfficiency,
    getFleetROI,
    getFleetCostPerKm,
    getFuelEfficiency,
    getOperationalCost,
    getCostPerKm,
    getVehicleROI,
    exportPayrollCsv,
    exportHealthAuditCsv
};
