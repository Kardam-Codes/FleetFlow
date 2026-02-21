const validateDriverCreate = ({
    name,
    license_number,
    license_expiry
}) => {

    if (!name || name.trim() === "") {
        throw new Error("Driver name is required");
    }

    if (name.length > 100) {
        throw new Error("Driver name cannot exceed 100 characters");
    }

    if (!license_number || license_number.trim() === "") {
        throw new Error("License number is required");
    }

    if (license_number.length > 100) {
        throw new Error("License number cannot exceed 100 characters");
    }

    if (!license_expiry) {
        throw new Error("License expiry date is required");
    }

    const expiryDate = new Date(license_expiry);

    if (isNaN(expiryDate.getTime())) {
        throw new Error("Invalid license expiry date");
    }

};


const validateDriverStatusUpdate = (status) => {

    const validStatuses = [
        "ON_DUTY",
        "OFF_DUTY",
        "SUSPENDED"
    ];

    if (!validStatuses.includes(status)) {
        throw new Error(
            "Invalid driver status. Must be ON_DUTY, OFF_DUTY, or SUSPENDED"
        );
    }

};


module.exports = {
    validateDriverCreate,
    validateDriverStatusUpdate
};