import React from "react";
import { theme } from "../../constants/theme";

const KPIWidget = ({ title, value, subtitle }) => {
  return (
    <div
      style={{
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "14px",
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = theme.colors.accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = theme.colors.border;
      }}
    >
      <span
        style={{
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "0.6px",
          color: theme.colors.textSecondary,
        }}
      >
        {title}
      </span>

      <span
        style={{
          fontSize: "28px",
          fontWeight: 600,
          color: theme.colors.accent,
        }}
      >
        {value}
      </span>

      {subtitle && (
        <span
          style={{
            fontSize: "12px",
            color: theme.colors.textMuted,
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  );
};

export default KPIWidget;