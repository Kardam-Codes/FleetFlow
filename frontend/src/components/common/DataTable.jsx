import React from "react";
import { theme } from "../../constants/theme";

const DataTable = ({ columns, data, loading, renderActions }) => {
  const containerStyle = {
    width: "100%",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "14px",
    overflow: "hidden",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
  };

  const headerCellStyle = {
    textAlign: "left",
    padding: "14px 16px",
    fontSize: "12px",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    color: theme.colors.textSecondary,
    background: theme.colors.elevated,
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  const cellStyle = {
    padding: "16px",
    fontSize: "14px",
    color: theme.colors.textPrimary,
    borderBottom: `1px solid ${theme.colors.border}`,
  };

  // Loading State
  if (loading) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: theme.colors.textSecondary,
          }}
        >
          Loading data...
        </div>
      </div>
    );
  }

  // Empty State
  if (!data || data.length === 0) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: theme.colors.textSecondary,
            }}
          >
            No records available
          </div>
          <div
            style={{
              fontSize: "12px",
              marginTop: "6px",
              color: theme.colors.textMuted,
            }}
          >
            Data will appear here once created.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div className="ff-table-scroll">
        <table style={tableStyle}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} style={headerCellStyle}>
                  {col.label}
                </th>
              ))}
              {renderActions && (
                <th style={headerCellStyle}>Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr
                key={index}
                style={{ transition: "background 0.2s ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    theme.colors.accentSoft)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "transparent")
                }
              >
                {columns.map((col) => (
                  <td key={col.key} style={cellStyle}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : row[col.key]}
                  </td>
                ))}

                {renderActions && (
                  <td style={cellStyle}>
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
