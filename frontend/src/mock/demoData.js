export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA !== "false"

export const mockDashboardStats = {
  activeFleet: 5,
  maintenanceAlerts: 2,
  utilizationRate: 71.43,
  pendingCargo: 18300,
  activeVehicles: 5,
  idleVehicles: 2,
  totalRevenue: 428500,
  totalFuelCost: 93820,
  fleetROI: 26.4,
}

export const mockVehicles = [
  { id: "veh-001", name: "Volvo FH16", license_plate: "MH12AB1201", max_capacity: 22000, odometer: 182340, acquisition_cost: 5400000, status: "ON_TRIP" },
  { id: "veh-002", name: "Ashok Leyland 2820", license_plate: "MH12AB1202", max_capacity: 18000, odometer: 160220, acquisition_cost: 4600000, status: "AVAILABLE" },
  { id: "veh-003", name: "Tata Prima", license_plate: "MH12AB1203", max_capacity: 16000, odometer: 142000, acquisition_cost: 4400000, status: "IN_SHOP" },
  { id: "veh-004", name: "Eicher Pro", license_plate: "MH12AB1204", max_capacity: 12000, odometer: 99820, acquisition_cost: 3000000, status: "AVAILABLE" },
  { id: "veh-005", name: "Mahindra Furio", license_plate: "MH12AB1205", max_capacity: 9000, odometer: 75400, acquisition_cost: 2500000, status: "ON_TRIP" },
  { id: "veh-006", name: "Force Traveller", license_plate: "MH12AB1206", max_capacity: 3000, odometer: 64880, acquisition_cost: 1900000, status: "ON_TRIP" },
  { id: "veh-007", name: "Piaggio Ape Xtra", license_plate: "MH12AB1207", max_capacity: 900, odometer: 45120, acquisition_cost: 480000, status: "ON_TRIP" },
  { id: "veh-008", name: "Legacy Unit", license_plate: "MH12AB1208", max_capacity: 11000, odometer: 286400, acquisition_cost: 2100000, status: "RETIRED" },
]

export const mockDrivers = [
  { id: "drv-001", name: "Rohit S", license_number: "DL-3345-009", license_expiry: "2027-06-30", status: "ON_DUTY", safety_score: 94 },
  { id: "drv-002", name: "Aman K", license_number: "DL-3345-010", license_expiry: "2026-11-12", status: "OFF_DUTY", safety_score: 88 },
  { id: "drv-003", name: "Neha M", license_number: "DL-3345-011", license_expiry: "2026-03-24", status: "ON_DUTY", safety_score: 91 },
  { id: "drv-004", name: "Vikram P", license_number: "DL-3345-012", license_expiry: "2026-02-18", status: "SUSPENDED", safety_score: 62 },
  { id: "drv-005", name: "Gaurav T", license_number: "DL-3345-013", license_expiry: "2027-08-19", status: "ON_DUTY", safety_score: 96 },
]

export const mockTrips = [
  { id: "trip-1001", vehicle_id: "veh-001", vehicle_name: "MH12AB1201", driver_id: "drv-001", driver_name: "Rohit S", cargo_weight: 12000, status: "DISPATCHED" },
  { id: "trip-1002", vehicle_id: "veh-005", vehicle_name: "MH12AB1205", driver_id: "drv-003", driver_name: "Neha M", cargo_weight: 5400, status: "DISPATCHED" },
  { id: "trip-1003", vehicle_id: "veh-004", vehicle_name: "MH12AB1204", driver_id: "drv-002", driver_name: "Aman K", cargo_weight: 7200, status: "DRAFT" },
  { id: "trip-1004", vehicle_id: "veh-006", vehicle_name: "MH12AB1206", driver_id: "drv-005", driver_name: "Gaurav T", cargo_weight: 1800, status: "COMPLETED" },
  { id: "trip-1005", vehicle_id: "veh-007", vehicle_name: "MH12AB1207", driver_id: "drv-001", driver_name: "Rohit S", cargo_weight: 550, status: "CANCELLED" },
]

export const mockMaintenance = [
  { id: "mnt-001", vehicle_id: "veh-003", license_plate: "MH12AB1203", description: "Brake pad replacement", cost: 28500, service_date: "2026-02-04" },
  { id: "mnt-002", vehicle_id: "veh-002", license_plate: "MH12AB1202", description: "Oil + filter service", cost: 9800, service_date: "2026-01-23" },
  { id: "mnt-003", vehicle_id: "veh-005", license_plate: "MH12AB1205", description: "Clutch checkup", cost: 12500, service_date: "2026-01-10" },
]

export const mockFuelLogs = [
  { id: "fuel-001", trip_id: "trip-1001", vehicle_id: "MH12AB1201", liters: 160, cost: 15920, fuel_date: "2026-02-19" },
  { id: "fuel-002", trip_id: "trip-1002", vehicle_id: "MH12AB1205", liters: 92, cost: 9080, fuel_date: "2026-02-18" },
  { id: "fuel-003", trip_id: "trip-1004", vehicle_id: "MH12AB1206", liters: 46, cost: 4520, fuel_date: "2026-02-15" },
]

export const mockFuelEfficiency = [
  { license_plate: "MH12AB1201", fuel_efficiency: 4.6 },
  { license_plate: "MH12AB1202", fuel_efficiency: 5.1 },
  { license_plate: "MH12AB1203", fuel_efficiency: 4.2 },
  { license_plate: "MH12AB1204", fuel_efficiency: 5.4 },
  { license_plate: "MH12AB1205", fuel_efficiency: 6.0 },
]

export const mockROI = [
  { license_plate: "MH12AB1201", roi: 0.34 },
  { license_plate: "MH12AB1202", roi: 0.22 },
  { license_plate: "MH12AB1203", roi: 0.18 },
  { license_plate: "MH12AB1204", roi: 0.27 },
  { license_plate: "MH12AB1205", roi: 0.31 },
]

export const mockCostPerKm = [
  { license_plate: "MH12AB1201", cost_per_km: 58.2 },
  { license_plate: "MH12AB1202", cost_per_km: 52.7 },
  { license_plate: "MH12AB1203", cost_per_km: 61.3 },
  { license_plate: "MH12AB1204", cost_per_km: 47.9 },
  { license_plate: "MH12AB1205", cost_per_km: 44.1 },
]
