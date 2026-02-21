import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

export default function FuelEfficiencyChart({ data }) {
  return (
    <div style={styles.card}>
      <h3>Fuel Efficiency (km/L)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const styles = {
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    marginBottom: "40px",
  },
}