import React from "react";
import { theme } from "../../constants/theme";

const Navbar = () => {
  return (
    <div
      style={{
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      {/* Page Title Placeholder */}
      <div
        style={{
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "0.4px",
          color: theme.colors.textPrimary,
        }}
      >
        Fleet Operations
      </div>

      {/* Right Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: theme.colors.textSecondary,
          }}
        >
          Manager
        </div>

        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: theme.colors.elevated,
            border: `1px solid ${theme.colors.border}`,
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;