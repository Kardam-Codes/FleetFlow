const driverModel = require("../models/driver.model");


// Create Driver Service
const createDriver = async (data) => {

    const { name, license_number, license_expiry } = data;


    // Basic validation
    if (!name || !license_number || !license_expiry) {
        throw new Error("All fields are required");
    }


    // License expiry validation
    const today = new Date();
    const expiryDate = new Date(license_expiry);

    if (expiryDate < today) {
        throw new Error("Cannot create driver with expired license");
    }


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

    const drivers = await driverModel.getAllDrivers();

    return drivers;
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
const updateDriverStatus = async (driverId, status) => {

    const validStatuses = [
        "ON_DUTY",
        "OFF_DUTY",
        "SUSPENDED"
    ];


    if (!validStatuses.includes(status)) {
        throw new Error("Invalid driver status");
    }


    const driver = await driverModel.updateDriverStatus(
        driverId,
        status
    );

    return driver;
};



// Delete Driver
const deleteDriver = async (driverId) => {

    const driver = await driverModel.deleteDriver(driverId);

    if (!driver) {
        throw new Error("Driver not found");
    }

    return driver;
};



// Check Driver Availability (IMPORTANT for Trips)
const checkDriverAvailability = async (driverId) => {

    const driver = await driverModel.getDriverById(driverId);

    if (!driver) {
        throw new Error("Driver not found");
    }


    // Check status
    if (driver.status !== "ON_DUTY") {
        throw new Error("Driver is not available");
    }


    // Check license expiry
    const today = new Date();
    const expiryDate = new Date(driver.license_expiry);

    if (expiryDate < today) {
        throw new Error("Driver license expired");
    }


    return true;
};



module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriverStatus,
    deleteDriver,
    checkDriverAvailability
};