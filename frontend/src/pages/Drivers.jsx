import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import StatusPill from "../components/common/StatusPill";
import { getDrivers } from "../api/driver.api";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await getDrivers();
      if (res.success) {
        setDrivers(res.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isExpiringSoon = (date) => {
    const expiry = new Date(date);
    const today = new Date();
    const diff = (expiry - today) / (1000 * 60 * 60 * 24);
    return diff <= 30;
  };

  const columns = [
    { key: "name", label: "Driver Name" },
    { key: "license_type", label: "License Type" },
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
    { key: "completion_rate", label: "Completion %" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Driver Performance & Compliance</h2>

      <DataTable
        columns={columns}
        data={drivers}
        loading={loading}
      />
    </div>
  );
};

export default Drivers;
