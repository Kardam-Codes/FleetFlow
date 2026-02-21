import React, { useEffect, useState } from "react";
import DataTable from "../components/common/DataTable";
import StatusPill from "../components/common/StatusPill";
import { getTrips } from "../api/trip.api";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await getTrips();
      if (res.success) {
        setTrips(res.data?.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
    return (
      <button
        style={{
          padding: "6px 12px",
          background: "#3b82f6",
          border: "none",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        View
      </button>
    );
  };

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Trip Dispatcher & Management</h2>

      <DataTable
        columns={columns}
        data={trips}
        loading={loading}
        renderActions={renderActions}
      />
    </div>
  );
};

export default Trips;
