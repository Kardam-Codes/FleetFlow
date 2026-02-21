import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import StatusPill from "../components/common/StatusPill";
import { vehicleApi } from "../api/vehicle.api";
import PageHeader from "../components/common/PageHeader";
import { theme } from "../constants/themes";

const defaultForm = {
  name: "",
  licensePlate: "",
  maxCapacity: "",
  acquisitionCost: "",
};

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleApi.getAll();
      if (response.success) {
        const rows = response.data?.data || [];
        setVehicles(rows.map((item) => ({
          ...item,
          name: item.name || item.license_plate,
        })));
      } else {
        setError(response.message);
      }
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError("");

    const response = await vehicleApi.create({
      name: form.name || form.licensePlate,
      licensePlate: form.licensePlate,
      maxCapacity: Number(form.maxCapacity),
      acquisitionCost: Number(form.acquisitionCost || 0),
    });

    if (!response.success) {
      setError(response.message || "Failed to create vehicle");
      return;
    }

    setForm(defaultForm);
    setShowForm(false);
    await fetchVehicles();
  };

  const handleRetire = async (vehicleId) => {
    const response = await vehicleApi.changeStatus(vehicleId, "RETIRED");
    if (!response.success) {
      setError(response.message || "Failed to update status");
      return;
    }

    await fetchVehicles();
  };

  const columns = [
    { key: "name", label: "Vehicle Name" },
    { key: "license_plate", label: "License Plate" },
    { key: "max_capacity", label: "Capacity (kg)" },
    { key: "odometer", label: "Odometer" },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusPill status={value} />,
    },
  ];

  const renderActions = (row) => (
    <button
      onClick={() => handleRetire(row.id)}
      disabled={String(row.status).toUpperCase() === "RETIRED"}
      style={{
        padding: "6px 10px",
        borderRadius: "6px",
        border: `1px solid ${theme.colors.border}`,
        background: "transparent",
        color: theme.colors.textSecondary,
        cursor: "pointer",
      }}
    >
      Retire
    </button>
  );

  return (
    <div>
      <PageHeader
        title="Vehicle Registry"
        subtitle="Manage fleet assets and availability"
        actions={
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            style={{
              padding: "10px 16px",
              background: theme.colors.accent,
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            {showForm ? "Close" : "Add Vehicle"}
          </button>
        }
      />

      {showForm ? (
        <form onSubmit={handleCreate} className="ff-form-grid">
          <input
            className="ff-field"
            placeholder="Name/Model"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            className="ff-field"
            required
            placeholder="License Plate"
            value={form.licensePlate}
            onChange={(event) => setForm((prev) => ({ ...prev, licensePlate: event.target.value }))}
          />
          <input
            className="ff-field"
            required
            type="number"
            placeholder="Max Capacity"
            value={form.maxCapacity}
            onChange={(event) => setForm((prev) => ({ ...prev, maxCapacity: event.target.value }))}
          />
          <input
            className="ff-field"
            type="number"
            placeholder="Acquisition Cost"
            value={form.acquisitionCost}
            onChange={(event) => setForm((prev) => ({ ...prev, acquisitionCost: event.target.value }))}
          />
          <button type="submit" className="ff-btn-primary">Create</button>
        </form>
      ) : null}

      {error ? <p style={{ color: "#ef4444" }}>{error}</p> : null}

      <DataTable
        columns={columns}
        data={vehicles}
        loading={loading}
        renderActions={renderActions}
      />
    </div>
  );
};

export default Vehicles;
