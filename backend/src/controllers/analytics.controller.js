const analyticsService = require("../services/analytics.service");


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



module.exports = {
    getFuelEfficiency,
    getOperationalCost,
    getCostPerKm,
    getVehicleROI
};