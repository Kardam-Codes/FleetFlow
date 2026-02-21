import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { theme } from "../../constants/theme";

const Layout = ({ children }) => {
  return (
    <div className="ff-layout" style={{ background: theme.colors.background }}>
      <Sidebar />

      <div className="ff-main-shell">
        <Navbar />

        <main className="ff-main-content" style={{ background: theme.colors.background }}>
          <div className="ff-content-wrap">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
