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
import { theme } from "../../constants/theme"

export default function FuelEfficiencyChart({ data }) {
  return (
    <div style={styles.card}>
      <h3>Fuel Efficiency (km/L)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.border} />
          <XAxis dataKey="label" stroke={theme.colors.textSecondary} />
          <YAxis stroke={theme.colors.textSecondary} />
          <Tooltip
            contentStyle={{
              background: theme.colors.elevated,
              border: `1px solid ${theme.colors.border}`,
              color: theme.colors.textPrimary,
            }}
          />
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
    background: theme.colors.surface,
    padding: "20px",
    borderRadius: "14px",
    border: `1px solid ${theme.colors.border}`,
    marginBottom: "40px",
    color: theme.colors.textPrimary,
  },
}
