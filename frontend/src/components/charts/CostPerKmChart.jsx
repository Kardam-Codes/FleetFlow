import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { theme } from "../../constants/theme"

export default function CostPerKmChart({ data }) {
  return (
    <div style={styles.card}>
      <h3>Cost Per KM</h3>
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
          <Line
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
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
