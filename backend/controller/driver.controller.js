const driverService = require("../services/driver.service");


// Create Driver
const createDriver = async (req, res, next) => {
    try {

        const data = req.body;

        const driver = await driverService.createDriver(data);

        res.status(201).json({
            success: true,
            message: "Driver created successfully",
            data: driver
        });

    } catch (error) {
        next(error);
    }
};



// Get All Drivers
const getAllDrivers = async (req, res, next) => {
    try {

        const drivers = await driverService.getAllDrivers();

        res.status(200).json({
            success: true,
            data: drivers
        });

    } catch (error) {
        next(error);
    }
};



// Get Driver By ID
const getDriverById = async (req, res, next) => {
    try {

        const { id } = req.params;

        const driver = await driverService.getDriverById(id);

        res.status(200).json({
            success: true,
            data: driver
        });

    } catch (error) {
        next(error);
    }
};



// Update Driver Status
const updateDriverStatus = async (req, res, next) => {
    try {

        const { id } = req.params;

        const { status } = req.body;

        const driver = await driverService.updateDriverStatus(
            id,
            status
        );

        res.status(200).json({
            success: true,
            message: "Driver status updated",
            data: driver
        });

    } catch (error) {
        next(error);
    }
};



// Delete Driver
const deleteDriver = async (req, res, next) => {
    try {

        const { id } = req.params;

        const driver = await driverService.deleteDriver(id);

        res.status(200).json({
            success: true,
            message: "Driver deleted successfully",
            data: driver
        });

    } catch (error) {
        next(error);
    }
};



module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriverStatus,
    deleteDriver
};