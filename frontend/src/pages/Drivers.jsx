import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import StatusPill from "../components/common/StatusPill";
import { driverApi } from "../api/driver.api";
import { USE_MOCK_DATA, mockDrivers } from "../mock/demoData";

const defaultForm = {
  name: "",
  license_number: "",
  license_expiry: "",
};

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      if (USE_MOCK_DATA) {
        setDrivers(mockDrivers);
        return;
      }
      const res = await driverApi.getAll();
      if (res.success) {
        setDrivers(res.data?.data || []);
      } else {
        setError(res.message || "Failed to fetch drivers");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError("");

    if (USE_MOCK_DATA) {
      setDrivers((prev) => [
        {
          id: `drv-${Date.now()}`,
          ...form,
          status: "ON_DUTY",
          safety_score: 100,
        },
        ...prev,
      ]);
      setForm(defaultForm);
      return;
    }

    const res = await driverApi.create(form);
    if (!res.success) {
      setError(res.message || "Failed to create driver");
      return;
    }

    setForm(defaultForm);
    await fetchDrivers();
  };

  const handleStatus = async (driverId, status) => {
    if (USE_MOCK_DATA) {
      setDrivers((prev) => prev.map((driver) => (
        driver.id === driverId ? { ...driver, status } : driver
      )));
      return;
    }

    const res = await driverApi.setStatus(driverId, status);
    if (!res.success) {
      setError(res.message || "Failed to update status");
      return;
    }

    await fetchDrivers();
  };

  const isExpiringSoon = (date) => {
    const expiry = new Date(date);
    const today = new Date();
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  };

  const columns = [
    { key: "name", label: "Driver Name" },
    { key: "license_number", label: "License Number" },
    {
      key: "license_expiry",
      label: "License Expiry",
      render: (value) => (
        <span
          style={{
            color: isExpiringSoon(value) ? "#f59e0b" : "#e5e7eb",
            fontWeight: isExpiringSoon(value) ? "600" : "400",
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => <StatusPill status={value} />,
    },
    { key: "safety_score", label: "Safety Score" },
  ];

  const renderActions = (row) => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <button style={actionBtn} onClick={() => handleStatus(row.id, "ON_DUTY")}>On Duty</button>
      <button style={actionBtn} onClick={() => handleStatus(row.id, "OFF_DUTY")}>Off Duty</button>
      <button style={actionBtn} onClick={() => handleStatus(row.id, "SUSPENDED")}>Suspend</button>
    </div>
  );

  return (
    <div className="ff-page">
      <div>
        <h2 className="ff-page-title">Driver Performance & Safety Profiles</h2>
        <p className="ff-page-subtitle">Track licenses, safety score, and duty status in one place.</p>
      </div>

      <form onSubmit={handleCreate} className="ff-form-grid">
        <input
          className="ff-field"
          required
          placeholder="Driver Name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <input
          className="ff-field"
          required
          placeholder="License Number"
          value={form.license_number}
          onChange={(event) => setForm((prev) => ({ ...prev, license_number: event.target.value }))}
        />
        <input
          className="ff-field"
          required
          type="date"
          value={form.license_expiry}
          onChange={(event) => setForm((prev) => ({ ...prev, license_expiry: event.target.value }))}
        />
        <button type="submit" className="ff-btn-primary">Add Driver</button>
      </form>

      {error ? <p className="ff-error">{error}</p> : null}

      <DataTable columns={columns} data={drivers} loading={loading} renderActions={renderActions} />
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

export default Drivers;
