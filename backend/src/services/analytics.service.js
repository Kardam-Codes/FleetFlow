const db = require("../database/db");


function toNumber(value) {
    return Number(value) || 0;
}


async function getVehicleScopedFilters() {
    const result = await db.query(
        `
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'vehicles';
        `
    );

    const columns = new Set(result.rows.map((row) => row.column_name));
    return {
        hasVehicleType: columns.has("vehicle_type"),
        hasRegion: columns.has("region")
    };
}


function buildVehicleFilterClause(filters, capabilities, values) {
    let clause = "";

    if (filters.status) {
        values.push(String(filters.status).toUpperCase());
        clause += ` AND vehicles.status = $${values.length}`;
    }

    if (filters.vehicleType && capabilities.hasVehicleType) {
        values.push(String(filters.vehicleType));
        clause += ` AND vehicles.vehicle_type = $${values.length}`;
    }

    if (filters.region && capabilities.hasRegion) {
        values.push(String(filters.region));
        clause += ` AND vehicles.region = $${values.length}`;
    }

    return clause;
}


// Dashboard level KPIs
const getDashboardStats = async (filters = {}) => {
    const values = [];
    const capabilities = await getVehicleScopedFilters();
    const filterClause = buildVehicleFilterClause(filters, capabilities, values);

    const vehicleStatsQuery = `
        SELECT
            COUNT(*) FILTER (WHERE vehicles.status = 'ON_TRIP') AS active_fleet,
            COUNT(*) FILTER (WHERE vehicles.status = 'IN_SHOP') AS maintenance_alerts,
            COUNT(*) FILTER (WHERE vehicles.status = 'AVAILABLE') AS idle_vehicles,
            COUNT(*) FILTER (WHERE vehicles.status = 'ON_TRIP') AS active_vehicles,
            COUNT(*) FILTER (WHERE vehicles.status <> 'RETIRED') AS non_retired_fleet
        FROM vehicles
        WHERE 1=1
        ${filterClause};
    `;

    const vehicleStatsResult = await db.query(vehicleStatsQuery, values);
    const vehicleStats = vehicleStatsResult.rows[0] || {};

    const pendingCargoQuery = `
        SELECT COALESCE(SUM(cargo_weight), 0) AS pending_cargo
        FROM trips
        WHERE status = 'DRAFT';
    `;

    const pendingCargoResult = await db.query(pendingCargoQuery);

    const financeQuery = `
        SELECT
            COALESCE(SUM(revenue), 0) AS total_revenue
        FROM trips
        WHERE status = 'COMPLETED';
    `;

    const financeResult = await db.query(financeQuery);

    const totalFuelCostQuery = `
        SELECT COALESCE(SUM(cost), 0) AS total_fuel_cost
        FROM fuel_logs;
    `;

    const totalFuelCostResult = await db.query(totalFuelCostQuery);

    const totalMaintenanceCostQuery = `
        SELECT COALESCE(SUM(cost), 0) AS total_maintenance_cost
        FROM maintenance_logs;
    `;

    const totalMaintenanceCostResult = await db.query(totalMaintenanceCostQuery);

    const totalAcquisitionCostQuery = `
        SELECT COALESCE(SUM(acquisition_cost), 0) AS total_acquisition_cost
        FROM vehicles;
    `;

    const totalAcquisitionCostResult = await db.query(totalAcquisitionCostQuery);

    const activeFleet = toNumber(vehicleStats.active_fleet);
    const maintenanceAlerts = toNumber(vehicleStats.maintenance_alerts);
    const idleVehicles = toNumber(vehicleStats.idle_vehicles);
    const activeVehicles = toNumber(vehicleStats.active_vehicles);
    const nonRetiredFleet = toNumber(vehicleStats.non_retired_fleet);

    const totalRevenue = toNumber(financeResult.rows[0]?.total_revenue);
    const totalFuelCost = toNumber(totalFuelCostResult.rows[0]?.total_fuel_cost);
    const totalMaintenanceCost = toNumber(totalMaintenanceCostResult.rows[0]?.total_maintenance_cost);
    const totalOperationalCost = totalFuelCost + totalMaintenanceCost;
    const totalAcquisitionCost = toNumber(totalAcquisitionCostResult.rows[0]?.total_acquisition_cost);

    const utilizationRate = nonRetiredFleet === 0 ? 0 : (activeVehicles / nonRetiredFleet) * 100;
    const fleetROI = totalAcquisitionCost === 0
        ? 0
        : ((totalRevenue - totalOperationalCost) / totalAcquisitionCost) * 100;

    return {
        activeFleet,
        maintenanceAlerts,
        utilizationRate: Number(utilizationRate.toFixed(2)),
        pendingCargo: toNumber(pendingCargoResult.rows[0]?.pending_cargo),
        activeVehicles,
        idleVehicles,
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalFuelCost: Number(totalFuelCost.toFixed(2)),
        fleetROI: Number(fleetROI.toFixed(2))
    };
};


// Fleet Fuel Efficiency = total distance / total fuel used
const getFleetFuelEfficiency = async () => {
    const query = `
        SELECT
            v.id AS vehicle_id,
            v.license_plate,
            COALESCE(SUM(t.end_odometer - t.start_odometer), 0) AS total_distance,
            COALESCE(SUM(fl.liters), 0) AS total_fuel
        FROM vehicles v
        LEFT JOIN trips t ON v.id = t.vehicle_id AND t.status = 'COMPLETED'
        LEFT JOIN fuel_logs fl ON t.id = fl.trip_id
        GROUP BY v.id, v.license_plate
        ORDER BY v.license_plate ASC;
    `;

    const result = await db.query(query);

    return result.rows.map((row) => {
        const totalDistance = toNumber(row.total_distance);
        const totalFuel = toNumber(row.total_fuel);
        const fuelEfficiency = totalFuel === 0 ? 0 : totalDistance / totalFuel;

        return {
            vehicle_id: row.vehicle_id,
            license_plate: row.license_plate,
            fuel_efficiency: Number(fuelEfficiency.toFixed(2))
        };
    });
};


// Fleet Cost per KM
const getFleetCostPerKm = async () => {
    const query = `
        SELECT
            v.id AS vehicle_id,
            v.license_plate,
            COALESCE(SUM(t.end_odometer - t.start_odometer), 0) AS total_distance,
            COALESCE(
                (SELECT SUM(fl.cost)
                 FROM fuel_logs fl
                 JOIN trips t2 ON t2.id = fl.trip_id
                 WHERE t2.vehicle_id = v.id),
                0
            ) AS total_fuel_cost,
            COALESCE(
                (SELECT SUM(ml.cost)
                 FROM maintenance_logs ml
                 WHERE ml.vehicle_id = v.id),
                0
            ) AS total_maintenance_cost
        FROM vehicles v
        LEFT JOIN trips t ON v.id = t.vehicle_id AND t.status = 'COMPLETED'
        GROUP BY v.id, v.license_plate
        ORDER BY v.license_plate ASC;
    `;

    const result = await db.query(query);

    return result.rows.map((row) => {
        const totalDistance = toNumber(row.total_distance);
        const totalOperationalCost = toNumber(row.total_fuel_cost) + toNumber(row.total_maintenance_cost);
        const costPerKm = totalDistance === 0 ? 0 : totalOperationalCost / totalDistance;

        return {
            vehicle_id: row.vehicle_id,
            license_plate: row.license_plate,
            cost_per_km: Number(costPerKm.toFixed(2))
        };
    });
};


// Fleet ROI = (Revenue - Cost) / Acquisition Cost
const getFleetROI = async () => {
    const query = `
        SELECT
            v.id AS vehicle_id,
            v.license_plate,
            COALESCE(v.acquisition_cost, 0) AS acquisition_cost,
            COALESCE(
                (SELECT SUM(t.revenue)
                 FROM trips t
                 WHERE t.vehicle_id = v.id AND t.status = 'COMPLETED'),
                0
            ) AS revenue,
            COALESCE(
                (SELECT SUM(fl.cost)
                 FROM fuel_logs fl
                 JOIN trips t2 ON t2.id = fl.trip_id
                 WHERE t2.vehicle_id = v.id),
                0
            ) AS fuel_cost,
            COALESCE(
                (SELECT SUM(ml.cost)
                 FROM maintenance_logs ml
                 WHERE ml.vehicle_id = v.id),
                0
            ) AS maintenance_cost
        FROM vehicles v
        ORDER BY v.license_plate ASC;
    `;

    const result = await db.query(query);

    return result.rows.map((row) => {
        const acquisitionCost = toNumber(row.acquisition_cost);
        const revenue = toNumber(row.revenue);
        const operationalCost = toNumber(row.fuel_cost) + toNumber(row.maintenance_cost);
        const roi = acquisitionCost === 0 ? 0 : (revenue - operationalCost) / acquisitionCost;

        return {
            vehicle_id: row.vehicle_id,
            license_plate: row.license_plate,
            roi: Number(roi.toFixed(4))
        };
    });
};


// Fuel Efficiency by specific vehicle
const getFuelEfficiencyByVehicle = async (vehicleId) => {
    const rows = await getFleetFuelEfficiency();
    const row = rows.find((item) => item.vehicle_id === vehicleId);

    if (!row) {
        return {
            vehicle_id: vehicleId,
            total_distance: 0,
            total_fuel: 0,
            fuel_efficiency_km_per_l: 0
        };
    }

    return {
        vehicle_id: vehicleId,
        fuel_efficiency_km_per_l: row.fuel_efficiency
    };
};


// Operational Cost by specific vehicle
const getOperationalCostByVehicle = async (vehicleId) => {
    const query = `
        SELECT
            COALESCE(
                (SELECT SUM(fl.cost)
                 FROM fuel_logs fl
                 JOIN trips t ON t.id = fl.trip_id
                 WHERE t.vehicle_id = $1),
                0
            ) AS fuel_cost,
            COALESCE(
                (SELECT SUM(ml.cost)
                 FROM maintenance_logs ml
                 WHERE ml.vehicle_id = $1),
                0
            ) AS maintenance_cost;
    `;

    const result = await db.query(query, [vehicleId]);

    const fuelCost = toNumber(result.rows[0]?.fuel_cost);
    const maintenanceCost = toNumber(result.rows[0]?.maintenance_cost);

    return {
        vehicle_id: vehicleId,
        fuel_cost: fuelCost,
        maintenance_cost: maintenanceCost,
        total_operational_cost: Number((fuelCost + maintenanceCost).toFixed(2))
    };
};


// Cost per km by specific vehicle
const getCostPerKmByVehicle = async (vehicleId) => {
    const rows = await getFleetCostPerKm();
    const row = rows.find((item) => item.vehicle_id === vehicleId);

    return {
        vehicle_id: vehicleId,
        cost_per_km: row ? row.cost_per_km : 0
    };
};


// ROI by specific vehicle
const getVehicleROI = async (vehicleId) => {
    const rows = await getFleetROI();
    const row = rows.find((item) => item.vehicle_id === vehicleId);

    return {
        vehicle_id: vehicleId,
        roi: row ? row.roi : 0
    };
};

function csvEscape(value) {
    const stringValue = String(value ?? "");
    if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
        return `"${stringValue.replace(/"/g, "\"\"")}"`;
    }
    return stringValue;
}

function toCsv(headers, rows) {
    const headerLine = headers.map(csvEscape).join(",");
    const rowLines = rows.map((row) => row.map(csvEscape).join(","));
    return [headerLine, ...rowLines].join("\n");
}

const getPayrollReportCsv = async (month) => {
    const query = `
        SELECT
            d.name AS driver_name,
            COUNT(t.id) AS completed_trips,
            COALESCE(SUM(t.revenue), 0) AS total_revenue
        FROM drivers d
        LEFT JOIN trips t
            ON d.id = t.driver_id
           AND t.status = 'COMPLETED'
           AND TO_CHAR(t.created_at, 'YYYY-MM') = $1
        GROUP BY d.id, d.name
        ORDER BY d.name ASC;
    `;

    const result = await db.query(query, [month]);
    const rows = result.rows.map((row) => [
        month,
        row.driver_name,
        toNumber(row.completed_trips),
        Number(toNumber(row.total_revenue).toFixed(2))
    ]);

    return toCsv(
        ["month", "driver_name", "completed_trips", "total_revenue"],
        rows
    );
};

const getHealthAuditCsv = async (month) => {
    const query = `
        SELECT
            v.license_plate,
            v.status,
            COALESCE(COUNT(m.id), 0) AS maintenance_events,
            COALESCE(SUM(m.cost), 0) AS maintenance_cost
        FROM vehicles v
        LEFT JOIN maintenance_logs m
            ON v.id = m.vehicle_id
           AND TO_CHAR(m.service_date, 'YYYY-MM') = $1
        GROUP BY v.id, v.license_plate, v.status
        ORDER BY v.license_plate ASC;
    `;

    const result = await db.query(query, [month]);
    const rows = result.rows.map((row) => [
        month,
        row.license_plate,
        row.status,
        toNumber(row.maintenance_events),
        Number(toNumber(row.maintenance_cost).toFixed(2))
    ]);

    return toCsv(
        ["month", "license_plate", "status", "maintenance_events", "maintenance_cost"],
        rows
    );
};

module.exports = {
    getDashboardStats,
    getFleetFuelEfficiency,
    getFleetCostPerKm,
    getFleetROI,
    getFuelEfficiencyByVehicle,
    getOperationalCostByVehicle,
    getCostPerKmByVehicle,
    getVehicleROI,
    getPayrollReportCsv,
    getHealthAuditCsv
};
