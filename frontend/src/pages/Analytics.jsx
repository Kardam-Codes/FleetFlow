import { useEffect, useState } from "react"
import { analyticsApi } from "../api/analytics.api"
import FuelEfficiencyChart from "../components/charts/FuelEfficiencyChart"
import ROIChart from "../components/charts/ROIChart"
import CostPerKmChart from "../components/charts/CostPerKmChart"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"

export default function Analytics() {
  const [stats, setStats] = useState(null)
  const [fuelData, setFuelData] = useState([])
  const [roiData, setRoiData] = useState([])
  const [costData, setCostData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)

      const dashboard = await analyticsApi.getDashboardStats()
      const fuel = await analyticsApi.getFuelEfficiency()
      const roi = await analyticsApi.getROI()
      const cost = await analyticsApi.getCostPerKm()

      if (!dashboard.success) {
        setError(dashboard.message)
        setLoading(false)
        return
      }

      setStats(dashboard.data?.data || {})
      setFuelData(fuel.data?.data || [])
      setRoiData(roi.data?.data || [])
      setCostData(cost.data?.data || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p>Loading analytics...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  const utilizationData = [
    { name: "Active", value: stats?.activeVehicles || 0 },
    { name: "Idle", value: stats?.idleVehicles || 0 },
  ]

  const COLORS = ["#3b82f6", "#e5e7eb"]

  return (
    <div style={styles.container}>
      <h2>Operational Analytics</h2>

      {/* KPI Cards */}
      <div style={styles.kpiGrid}>
        <KPI label="Total Revenue" value={stats?.totalRevenue} />
        <KPI label="Fuel Cost" value={stats?.totalFuelCost} />
        <KPI label="Fleet ROI %" value={stats?.fleetROI} />
        <KPI label="Utilization %" value={stats?.utilizationRate} />
      </div>

      {/* Donut Chart */}
      <div style={styles.chartCard}>
        <h3>Fleet Utilization</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={utilizationData}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              animationDuration={800}
            >
              {utilizationData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <FuelEfficiencyChart data={fuelData} />
      <ROIChart data={roiData} />
      <CostPerKmChart data={costData} />
    </div>
  )
}

function KPI({ label, value }) {
  return (
    <div style={styles.kpiCard}>
      <p style={styles.kpiLabel}>{label}</p>
      <h3>{value ?? 0}</h3>
    </div>
  )
}

const styles = {
  container: {
    padding: "20px",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  kpiCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  kpiLabel: {
    color: "#6b7280",
    fontSize: "14px",
  },
  chartCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    marginBottom: "40px",
  },
}
