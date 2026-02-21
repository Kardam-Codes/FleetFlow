import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { theme } from "../../constants/theme"

export default function ROIChart({ data }) {
  return (
    <div style={styles.card}>
      <h3>Vehicle ROI Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          <Bar
            dataKey="value"
            fill="#10b981"
            radius={[8, 8, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
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
