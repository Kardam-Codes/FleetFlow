const driverModel = require("../models/driver.model");

const {
    validateDriverCreate,
    validateDriverStatusUpdate
} = require("../validations/driver.validation");


// ==============================
// Create Driver
// ==============================
const createDriver = async ({
    name,
    license_number,
    license_expiry
}) => {

    // Validate input
    try {
        validateDriverCreate({
            name,
            license_number,
            license_expiry
        });
    } catch (err) {
        err.status = 400;
        throw err;
    }


    // Create driver
    const driver = await driverModel.createDriver({
        name,
        license_number,
        license_expiry
    });

    if (!driver) {
        const error = new Error("Failed to create driver");
        error.status = 500;
        throw error;
    }

    return driver;
};



// ==============================
// Get All Drivers
// ==============================
const getAllDrivers = async () => {

    const drivers = await driverModel.getAllDrivers();

    return drivers || [];
};



// ==============================
// Get Driver By ID
// ==============================
const getDriverById = async (driverId) => {

    if (!driverId) {
        const error = new Error("Driver ID is required");
        error.status = 400;
        throw error;
    }

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        const error = new Error("Driver not found");
        error.status = 404;
        throw error;
    }

    return driver;
};



// ==============================
// Update Driver Status
// ==============================
const updateDriverStatus = async ({
    driverId,
    status
}) => {

    if (!driverId) {
        const error = new Error("Driver ID is required");
        error.status = 400;
        throw error;
    }

    if (!status) {
        const error = new Error("Status is required");
        error.status = 400;
        throw error;
    }


    // Validate status
    try {
        validateDriverStatusUpdate(status);
    } catch (err) {
        err.status = 400;
        throw err;
    }


    // Check driver exists
    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        const error = new Error("Driver not found");
        error.status = 404;
        throw error;
    }


    // Update status
    const updatedDriver =
        await driverModel.updateDriverStatus({
            driverId,
            status
        });

    if (!updatedDriver) {
        const error = new Error("Failed to update driver status");
        error.status = 500;
        throw error;
    }

    return updatedDriver;
};



// ==============================
// Delete Driver
// ==============================
const deleteDriver = async (driverId) => {

    if (!driverId) {
        const error = new Error("Driver ID is required");
        error.status = 400;
        throw error;
    }


    // Check driver exists
    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        const error = new Error("Driver not found");
        error.status = 404;
        throw error;
    }


    // Delete driver
    const deletedDriver =
        await driverModel.deleteDriver(driverId);

    if (!deletedDriver) {
        const error = new Error("Failed to delete driver");
        error.status = 500;
        throw error;
    }

    return deletedDriver;
};



// ==============================