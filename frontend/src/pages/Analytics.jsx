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
import { theme } from "../constants/theme"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export default function Analytics() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7))
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
      setFuelData(
        (fuel.data?.data || []).map((item) => ({
          label: item.license_plate,
          value: item.fuel_efficiency,
        }))
      )
      setRoiData(
        (roi.data?.data || []).map((item) => ({
          label: item.license_plate,
          value: Number((item.roi * 100).toFixed(2)),
        }))
      )
      setCostData(
        (cost.data?.data || []).map((item) => ({
          label: item.license_plate,
          value: item.cost_per_km,
        }))
      )
      setLoading(false)
    }

    fetchData()
  }, [])

  async function exportCsv(path, filename) {
    const token = localStorage.getItem("token")
    const url = `${API_BASE_URL}${path}?month=${month}`

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      setError("Failed to export report")
      return
    }

    const blob = await response.blob()
    const href = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = href
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(href)
  }

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

      <div style={styles.exportBar}>
        <input
          type="month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          className="ff-field"
        />
        <button
          type="button"
          className="ff-btn-muted"
          onClick={() => exportCsv("/analytics/reports/payroll.csv", `payroll-${month}.csv`)}
        >
          Export Payroll CSV
        </button>
        <button
          type="button"
          className="ff-btn-muted"
          onClick={() => exportCsv("/analytics/reports/health.csv", `health-audit-${month}.csv`)}
        >
          Export Health CSV
        </button>
        <button type="button" className="ff-btn-muted" onClick={() => window.print()}>
          Export PDF
        </button>
      </div>

      <div style={styles.kpiGrid}>
        <KPI label="Total Revenue" value={stats?.totalRevenue} />
        <KPI label="Fuel Cost" value={stats?.totalFuelCost} />
        <KPI label="Fleet ROI %" value={stats?.fleetROI} />
        <KPI label="Utilization %" value={stats?.utilizationRate} />
      </div>

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
            <Tooltip
              contentStyle={{
                background: theme.colors.elevated,
                border: `1px solid ${theme.colors.border}`,
                color: theme.colors.textPrimary,
              }}
            />
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
    padding: "4px 0",
    color: theme.colors.textPrimary,
  },
  exportBar: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  kpiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  kpiCard: {
    background: theme.colors.surface,
    padding: "20px",
    borderRadius: "14px",
    border: `1px solid ${theme.colors.border}`,
  },
  kpiLabel: {
    color: theme.colors.textSecondary,
    fontSize: "14px",
  },
  chartCard: {
    background: theme.colors.surface,
    padding: "20px",
    borderRadius: "14px",
    border: `1px solid ${theme.colors.border}`,
    marginBottom: "40px",
  },
}
