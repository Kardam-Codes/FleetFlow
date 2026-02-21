import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import StatusPill from "../components/common/StatusPill";
import { tripApi } from "../api/trip.api";
import { vehicleApi } from "../api/vehicle.api";
import { driverApi } from "../api/driver.api";

const defaultForm = {
  vehicle_id: "",
  driver_id: "",
  cargo_weight: "",
  start_odometer: "",
};

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    setLoading(true);
    await Promise.all([fetchTrips(), fetchVehicles(), fetchDrivers()]);
    setLoading(false);
  };

  const fetchTrips = async () => {
    const res = await tripApi.getAll();
    if (res.success) {
      setTrips(res.data?.data || []);
      return;
    }

    setError(res.message || "Failed to fetch trips");
  };

  const fetchVehicles = async () => {
    const res = await vehicleApi.getAll();
    if (res.success) {
      setVehicles((res.data?.data || []).filter((item) => item.status === "AVAILABLE"));
    }
  };

  const fetchDrivers = async () => {
    const res = await driverApi.getAll();
    if (res.success) {
      setDrivers((res.data?.data || []).filter((item) => item.status === "ON_DUTY"));
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError("");

    const response = await tripApi.create({
      ...form,
      cargo_weight: Number(form.cargo_weight),
      start_odometer: Number(form.start_odometer),
    });

    if (!response.success) {
      setError(response.message || "Failed to create trip");
      return;
    }

    setForm(defaultForm);
    await bootstrap();
  };

  const handleDispatch = async (tripId) => {
    const response = await tripApi.dispatch(tripId);
    if (!response.success) {
      setError(response.message || "Dispatch failed");
      return;
    }

    await bootstrap();
  };

  const handleCancel = async (tripId) => {
    const response = await tripApi.cancel(tripId);
    if (!response.success) {
      setError(response.message || "Cancel failed");
      return;
    }

    await bootstrap();
  };

  const handleComplete = async (tripId) => {
    const endOdometer = window.prompt("End odometer:");
    const revenue = window.prompt("Revenue:");

    if (!endOdometer || !revenue) return;

    const response = await tripApi.complete(tripId, {
      end_odometer: Number(endOdometer),
      revenue: Number(revenue),
    });

    if (!response.success) {
      setError(response.message || "Completion failed");
      return;
    }

    await bootstrap();
  };

  const columns = [
    { key: "id", label: "Trip ID" },
    { key: "vehicle_name", label: "Vehicle" },
    { key: "driver_name", label: "Driver" },
    { key: "cargo_weight", label: "Cargo (kg)" },
    {
      key: "status",
      label: "Lifecycle",
      render: (value) => <StatusPill status={value} />,
    },
  ];

  const renderActions = (row) => {
    const status = String(row.status || "").toUpperCase();

    return (
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {status === "DRAFT" ? (
          <button style={actionBtn} onClick={() => handleDispatch(row.id)}>Dispatch</button>
        ) : null}
        {status === "DISPATCHED" ? (
          <button style={actionBtn} onClick={() => handleComplete(row.id)}>Complete</button>
        ) : null}
        {status === "DRAFT" || status === "DISPATCHED" ? (
          <button style={actionBtn} onClick={() => handleCancel(row.id)}>Cancel</button>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Trip Dispatcher & Management</h2>

      <form onSubmit={handleCreate} className="ff-form-grid">
        <select
          className="ff-field"
          required
          value={form.vehicle_id}
          onChange={(event) => setForm((prev) => ({ ...prev, vehicle_id: event.target.value }))}
        >
          <option value="">Select Available Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.license_plate}
            </option>
          ))}
        </select>

        <select
          className="ff-field"
          required
          value={form.driver_id}
          onChange={(event) => setForm((prev) => ({ ...prev, driver_id: event.target.value }))}
        >
          <option value="">Select Available Driver</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>

        <input
          className="ff-field"
          required
          type="number"
          placeholder="Cargo Weight (kg)"
          value={form.cargo_weight}
          onChange={(event) => setForm((prev) => ({ ...prev, cargo_weight: event.target.value }))}
        />

        <input
          className="ff-field"
          required
          type="number"
          placeholder="Start Odometer"
          value={form.start_odometer}
          onChange={(event) => setForm((prev) => ({ ...prev, start_odometer: event.target.value }))}
        />

        <button type="submit" className="ff-btn-primary">Create Draft Trip</button>
      </form>

      {error ? <p style={{ color: "#ef4444" }}>{error}</p> : null}

      <DataTable
        columns={columns}
        data={trips}
        loading={loading}
        renderActions={renderActions}
      />
    </div>
  );
};

const actionBtn = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #262b36",
  background: "transparent",
  color: "#9aa3b2",
  cursor: "pointer",
};

export default Trips;
