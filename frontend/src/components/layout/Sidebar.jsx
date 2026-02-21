import React from "react";
import { NavLink } from "react-router-dom";
import { theme } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", roles: ["FLEET_MANAGER", "DISPATCHER", "SAFETY_OFFICER", "FINANCIAL_ANALYST"] },
  { to: "/vehicles", label: "Vehicles", roles: ["FLEET_MANAGER"] },
  { to: "/drivers", label: "Drivers", roles: ["FLEET_MANAGER", "SAFETY_OFFICER"] },
  { to: "/trips", label: "Trips", roles: ["FLEET_MANAGER", "DISPATCHER"] },
  { to: "/maintenance", label: "Maintenance", roles: ["FLEET_MANAGER"] },
  { to: "/fuel", label: "Fuel Logs", roles: ["FLEET_MANAGER", "FINANCIAL_ANALYST"] },
  { to: "/analytics", label: "Analytics", roles: ["FLEET_MANAGER", "FINANCIAL_ANALYST"] },
];

function normalizeRole(role) {
  const normalizedRole = String(role || "").toUpperCase();
  if (normalizedRole === "MANAGER") return "FLEET_MANAGER";
  return normalizedRole;
}

const Sidebar = () => {
  const { user } = useAuth();
  const currentRole = normalizeRole(user?.role);

  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    marginBottom: "6px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    letterSpacing: "0.3px",
    transition: "all 0.2s ease",
    color: isActive
      ? theme.colors.accent
      : theme.colors.textSecondary,
    background: isActive
      ? theme.colors.accentSoft
      : "transparent",
  });

  const visibleItems = navItems.filter((item) => item.roles.includes(currentRole));

  return (
    <div
      className="ff-sidebar"
      style={{
        background: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.border}`,
        padding: "24px 16px",
      }}
    >
      <div
        style={{
          marginBottom: "40px",
          fontSize: "18px",
          fontWeight: 600,
          letterSpacing: "1px",
          color: theme.colors.textPrimary,
        }}
      >
        FleetFlow
      </div>

      <nav style={{ display: "flex", flexDirection: "column" }}>
        {visibleItems.map((item) => (
          <NavLink key={item.to} to={item.to} style={linkStyle}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div
        style={{
          marginTop: "auto",
          fontSize: "12px",
          color: theme.colors.textMuted,
        }}
      >
        Fleet Management System
      </div>
    </div>
  );
};

export default Sidebar;
