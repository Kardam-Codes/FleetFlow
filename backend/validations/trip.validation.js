const validateTripCreate = ({
    vehicle_id,
    driver_id,
    cargo_weight,
    start_odometer
}) => {

    if (!vehicle_id) {
        throw new Error("Vehicle ID is required");
    }

    if (!driver_id) {
        throw new Error("Driver ID is required");
    }

    if (cargo_weight == null) {
        throw new Error("Cargo weight is required");
    }

    if (cargo_weight <= 0) {
        throw new Error("Cargo weight must be greater than 0");
    }

    if (start_odometer == null) {
        throw new Error("Start odometer is required");
    }

    if (start_odometer < 0) {
        throw new Error("Start odometer cannot be negative");
    }

};


const validateTripComplete = ({
    end_odometer,
    revenue
}) => {

    if (end_odometer == null) {
        throw new Error("End odometer is required");
    }

    if (end_odometer < 0) {
        throw new Error("End odometer cannot be negative");
    }

    if (revenue == null) {
        throw new Error("Revenue is required");
    }

    if (revenue < 0) {
        throw new Error("Revenue cannot be negative");
    }

};


module.exports = {
    validateTripCreate,
    validateTripComplete
};