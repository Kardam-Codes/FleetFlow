import React from "react";
import { NavLink } from "react-router-dom";
import { theme } from "../../constants/theme";

const Sidebar = () => {
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

  return (
    <div
      style={{
        width: "240px",
        background: theme.colors.surface,
        borderRight: `1px solid ${theme.colors.border}`,
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo / App Name */}
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

      {/* Navigation */}
      <nav style={{ display: "flex", flexDirection: "column" }}>
        <NavLink to="/" style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/vehicles" style={linkStyle}>
          Vehicles
        </NavLink>

        <NavLink to="/drivers" style={linkStyle}>
          Drivers
        </NavLink>

        <NavLink to="/trips" style={linkStyle}>
          Trips
        </NavLink>
      </nav>

      {/* Footer Section */}
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