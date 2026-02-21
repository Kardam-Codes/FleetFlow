import React, { useEffect, useState } from "react";
import KPIWidget from "../components/common/KPIWidget";
import { getAnalyticsOverview } from "../api/analytics.api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeFleet: 0,
    maintenanceAlerts: 0,
    utilizationRate: 0,
    pendingCargo: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await getAnalyticsOverview();
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.6s ease-in-out" }}>
      <h1 style={{ marginBottom: "30px" }}>Command Center</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        <KPIWidget
          title="Active Fleet"
          value={loading ? "..." : stats.activeFleet}
        />

        <KPIWidget
          title="Maintenance Alerts"
          value={loading ? "..." : stats.maintenanceAlerts}
        />

        <KPIWidget
          title="Utilization Rate"
          value={
            loading ? "..." : `${stats.utilizationRate}%`
          }
        />

        <KPIWidget
          title="Pending Cargo"
          value={loading ? "..." : stats.pendingCargo}
        />
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

export default Dashboard;