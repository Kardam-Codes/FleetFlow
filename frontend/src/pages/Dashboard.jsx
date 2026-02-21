import React, { useEffect, useState } from "react";
import KPIWidget from "../components/common/KPIWidget";
import { getAnalyticsOverview } from "../api/analytics.api";

const Dashboard = () => {
  const [filters, setFilters] = useState({
    status: "",
    vehicleType: "",
    region: "",
  });

  const [stats, setStats] = useState({
    activeFleet: 0,
    maintenanceAlerts: 0,
    utilizationRate: 0,
    pendingCargo: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, [filters.status, filters.vehicleType, filters.region]);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await getAnalyticsOverview(filters);
      if (res.success) {
        setStats(res.data?.data || stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.6s ease-in-out" }}>
      <h1 style={{ marginBottom: "16px" }}>Command Center</h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select value={filters.status} onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))} style={filterStyle}>
          <option value="">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="ON_TRIP">On Trip</option>
          <option value="IN_SHOP">In Shop</option>
          <option value="RETIRED">Retired</option>
        </select>

        <input
          placeholder="Vehicle Type"
          value={filters.vehicleType}
          onChange={(e) => setFilters((prev) => ({ ...prev, vehicleType: e.target.value }))}
          style={filterStyle}
        />

        <input
          placeholder="Region"
          value={filters.region}
          onChange={(e) => setFilters((prev) => ({ ...prev, region: e.target.value }))}
          style={filterStyle}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        <KPIWidget title="Active Fleet" value={loading ? "..." : stats.activeFleet} />

        <KPIWidget title="Maintenance Alerts" value={loading ? "..." : stats.maintenanceAlerts} />

        <KPIWidget title="Utilization Rate" value={loading ? "..." : `${stats.utilizationRate}%`} />

        <KPIWidget title="Pending Cargo" value={loading ? "..." : stats.pendingCargo} />
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const filterStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #262b36",
  background: "#1c1f2a",
  color: "#e6e8ec",
};

export default Dashboard;
