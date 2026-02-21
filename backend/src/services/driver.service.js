const driverModel = require("../models/driver.model");

const {
    validateDriverCreate,
    validateDriverStatusUpdate
} = require("../../validations/driver.validation");


function createError(message, statusCode = 400) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}


// Create Driver
const createDriver = async ({
    name,
    license_number,
    license_expiry
}) => {

    validateDriverCreate({
        name,
        license_number,
        license_expiry
    });

    const driver = await driverModel.createDriver({
        name,
        license_number,
        license_expiry
    });

    return driver;
};


// Get All Drivers
const getAllDrivers = async () => {

    return await driverModel.getAllDrivers();
};


// Get Driver By ID
const getDriverById = async (driverId) => {

    if (!driverId) {
        throw createError("Driver ID is required", 400);
    }

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw createError("Driver not found", 404);
    }

    return driver;
};


// Update Driver Status
const updateDriverStatus = async (driverId, status) => {

    if (!driverId) {
        throw createError("Driver ID is required", 400);
    }

    validateDriverStatusUpdate(status);

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw createError("Driver not found", 404);
    }

    const updatedDriver = await driverModel.updateDriverStatus(driverId, status);

    return updatedDriver;
};


// Delete Driver
const deleteDriver = async (driverId) => {

    if (!driverId) {
        throw createError("Driver ID is required", 400);
    }

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw createError("Driver not found", 404);
    }

    return await driverModel.deleteDriver(driverId);
};


module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriverStatus,
    deleteDriver
};
