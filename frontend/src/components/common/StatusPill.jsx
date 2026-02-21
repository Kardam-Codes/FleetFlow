import React from "react";
import { theme } from "../../constants/theme";

const statusMap = {
  available: {
    bg: "rgba(34,197,94,0.15)",
    color: theme.colors.success,
  },
  on_trip: {
    bg: theme.colors.accentSoft,
    color: theme.colors.accent,
  },
  in_shop: {
    bg: "rgba(245,158,11,0.15)",
    color: theme.colors.warning,
  },
  retired: {
    bg: "rgba(107,114,128,0.15)",
    color: theme.colors.textMuted,
  },
  draft: {
    bg: "rgba(107,114,128,0.15)",
    color: theme.colors.textMuted,
  },
  dispatched: {
    bg: theme.colors.accentSoft,
    color: theme.colors.accent,
  },
  on_duty: {
    bg: "rgba(34,197,94,0.15)",
    color: theme.colors.success,
  },
  off_duty: {
    bg: "rgba(107,114,128,0.15)",
    color: theme.colors.textMuted,
  },
  suspended: {
    bg: "rgba(239,68,68,0.15)",
    color: theme.colors.error,
  },
  completed: {
    bg: "rgba(34,197,94,0.15)",
    color: theme.colors.success,
  },
  cancelled: {
    bg: "rgba(239,68,68,0.15)",
    color: theme.colors.error,
  },
};

const StatusPill = ({ status }) => {
  const normalized = status?.toLowerCase();
  const config = statusMap[normalized] || {
    bg: theme.colors.elevated,
    color: theme.colors.textSecondary,
  };

  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 500,
        letterSpacing: "0.5px",
        textTransform: "capitalize",
        background: config.bg,
        color: config.color,
        border: `1px solid ${config.color}`,
      }}
    >
      {status}
    </span>
  );
};

export default StatusPill;
