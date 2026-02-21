import React from "react";
import { theme } from "../../constants/theme";

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div
      style={{
        marginBottom: "28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: 600,
            color: theme.colors.textPrimary,
            letterSpacing: "0.4px",
          }}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            style={{
              marginTop: "6px",
              fontSize: "14px",
              color: theme.colors.textSecondary,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;