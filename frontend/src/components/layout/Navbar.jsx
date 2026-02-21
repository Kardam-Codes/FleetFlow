import React from "react";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

function normalizeRole(role) {
  const normalizedRole = String(role || "").toUpperCase();
  if (normalizedRole === "MANAGER") return "FLEET_MANAGER";
  return normalizedRole.replaceAll("_", " ");
}

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div
      className="ff-navbar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        background: theme.colors.surface,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "13px", color: theme.colors.textPrimary }}>
            {user?.name || "User"}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: theme.colors.textSecondary,
              textTransform: "capitalize",
            }}
          >
            {normalizeRole(user?.role)}
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: `1px solid ${theme.colors.border}`,
            background: "transparent",
            color: theme.colors.textSecondary,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
