const driverModel = require("../models/driver.model");

const {
    validateDriverCreate,
    validateDriverStatusUpdate
} = require("../validations/driver.validation");


// Create Driver
const createDriver = async ({
    name,
    license_number,
    license_expiry
}) => {

    // VALIDATION
    validateDriverCreate({
        name,
        license_number,
        license_expiry
    });


    // Create driver in database
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
        throw new Error("Driver ID is required");
    }

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw new Error("Driver not found");
    }

    return driver;
};



// Update Driver Status
const updateDriverStatus = async ({
    driverId,
    status
}) => {

    if (!driverId) {
        throw new Error("Driver ID is required");
    }


    // VALIDATION
    validateDriverStatusUpdate(status);


    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw new Error("Driver not found");
    }


    const updatedDriver =
        await driverModel.updateDriverStatus({
            driverId,
            status
        });


    return updatedDriver;
};



// Delete Driver
const deleteDriver = async (driverId) => {

    if (!driverId) {
        throw new Error("Driver ID is required");
    }

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw new Error("Driver not found");
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