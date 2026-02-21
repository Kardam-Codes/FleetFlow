const db = require("../database/db");


// Fuel Efficiency = total distance / total fuel used
const getFuelEfficiencyByVehicle = async (vehicleId) => {

    const query = `
        SELECT 
            SUM(trips.end_odometer - trips.start_odometer) AS total_distance,
            SUM(fuel_logs.liters) AS total_fuel
        FROM trips
        JOIN fuel_logs ON trips.id = fuel_logs.trip_id
        WHERE trips.vehicle_id = $1
        AND trips.status = 'COMPLETED';
    `;

    const result = await db.query(query, [vehicleId]);

    const totalDistance = Number(result.rows[0].total_distance) || 0;
    const totalFuel = Number(result.rows[0].total_fuel) || 0;

    const efficiency =
        totalFuel === 0 ? 0 : totalDistance / totalFuel;

    return {
        vehicle_id: vehicleId,
        total_distance: totalDistance,
        total_fuel: totalFuel,
        fuel_efficiency_km_per_l: efficiency
    };
};



// Total Maintenance Cost
const getMaintenanceCostByVehicle = async (vehicleId) => {

    const query = `
        SELECT SUM(cost) AS total_maintenance_cost
        FROM maintenance_logs
        WHERE vehicle_id = $1;
    `;

    const result = await db.query(query, [vehicleId]);

    return Number(result.rows[0].total_maintenance_cost) || 0;
};



// Total Fuel Cost
const getFuelCostByVehicle = async (vehicleId) => {

    const query = `
        SELECT SUM(fuel_logs.cost) AS total_fuel_cost
        FROM fuel_logs
        JOIN trips ON fuel_logs.trip_id = trips.id
        WHERE trips.vehicle_id = $1;
    `;

    const result = await db.query(query, [vehicleId]);

    return Number(result.rows[0].total_fuel_cost) || 0;
};



// Total Revenue
const getRevenueByVehicle = async (vehicleId) => {

    const query = `
        SELECT SUM(revenue) AS total_revenue
        FROM trips
        WHERE vehicle_id = $1
        AND status = 'COMPLETED';
    `;

    const result = await db.query(query, [vehicleId]);

    return Number(result.rows[0].total_revenue) || 0;
};



// Operational Cost = fuel + maintenance
const getOperationalCostByVehicle = async (vehicleId) => {

    const fuelCost = await getFuelCostByVehicle(vehicleId);

    const maintenanceCost =
        await getMaintenanceCostByVehicle(vehicleId);

    const totalCost = fuelCost + maintenanceCost;

    return {
        vehicle_id: vehicleId,
        fuel_cost: fuelCost,
        maintenance_cost: maintenanceCost,
        total_operational_cost: totalCost
    };
};



// Cost per km
const getCostPerKmByVehicle = async (vehicleId) => {

    const costData =
        await getOperationalCostByVehicle(vehicleId);

    const distanceQuery = `
        SELECT 
            SUM(end_odometer - start_odometer) AS total_distance
        FROM trips
        WHERE vehicle_id = $1
        AND status = 'COMPLETED';
    `;

    const distanceResult =
        await db.query(distanceQuery, [vehicleId]);

    const totalDistance =
        Number(distanceResult.rows[0].total_distance) || 0;

    const costPerKm =
        totalDistance === 0
            ? 0
            : costData.total_operational_cost / totalDistance;

    return {
        vehicle_id: vehicleId,
        total_distance: totalDistance,
        total_operational_cost:
            costData.total_operational_cost,
        cost_per_km: costPerKm
    };
};



// ROI = (Revenue - Cost) / Acquisition Cost
const getVehicleROI = async (vehicleId) => {

    const revenue = await getRevenueByVehicle(vehicleId);

    const costData =
        await getOperationalCostByVehicle(vehicleId);

    const vehicleQuery = `
        SELECT acquisition_cost
        FROM vehicles
        WHERE id = $1;
    `;

    const vehicleResult =
        await db.query(vehicleQuery, [vehicleId]);

    const acquisitionCost =
        Number(vehicleResult.rows[0].acquisition_cost) || 0;

    const profit = revenue - costData.total_operational_cost;

    const roi =
        acquisitionCost === 0
            ? 0
            : profit / acquisitionCost;

    return {
        vehicle_id: vehicleId,
        revenue,
        operational_cost: costData.total_operational_cost,
        acquisition_cost: acquisitionCost,
        profit,
        roi
    };
};



module.exports = {
    getFuelEfficiencyByVehicle,
    getOperationalCostByVehicle,
    getCostPerKmByVehicle,
    getVehicleROI
};