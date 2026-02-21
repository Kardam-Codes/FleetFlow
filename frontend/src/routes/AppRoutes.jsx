<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ProtectedRoute from "./ProtectedRoute"

// Public
import Login from "../pages/Login"

// Jay's Pages
import Dashboard from "../pages/Dashboard"
import Vehicles from "../pages/Vehicles"
import Drivers from "../pages/Drivers"
import Trips from "../pages/Trips"

// Kardam's Pages
import Maintenance from "../pages/Maintenance"
import FuelLogs from "../pages/FuelLogs"
import Analytics from "../pages/Analytics"

import Layout from "../components/layout/Layout"

export default function AppRoutes() {
  const { isAuthenticated, user } = useAuth()

  return (
    <Routes>
      {/* INDEX ROUTE */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
=======
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Vehicles from "../pages/Vehicles";
import Drivers from "../pages/Drivers";
import Trips from "../pages/Trips";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
>>>>>>> jay-frontend
        }
      />

      <Route
        path="/vehicles"
        element={
<<<<<<< HEAD
          <ProtectedRoute allowedRoles={["FLEET_MANAGER"]}>
            <Layout>
              <Vehicles />
            </Layout>
          </ProtectedRoute>
=======
          <Layout>
            <Vehicles />
          </Layout>
>>>>>>> jay-frontend
        }
      />

      <Route
        path="/drivers"
        element={
<<<<<<< HEAD
          <ProtectedRoute
            allowedRoles={["FLEET_MANAGER", "SAFETY_OFFICER"]}
          >
            <Layout>
              <Drivers />
            </Layout>
          </ProtectedRoute>
=======
          <Layout>
            <Drivers />
          </Layout>
>>>>>>> jay-frontend
        }
      />

      <Route
        path="/trips"
        element={
<<<<<<< HEAD
          <ProtectedRoute
            allowedRoles={["DISPATCHER", "FLEET_MANAGER"]}
          >
            <Layout>
              <Trips />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance"
        element={
          <ProtectedRoute allowedRoles={["FLEET_MANAGER"]}>
            <Layout>
              <Maintenance />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/fuel"
        element={
          <ProtectedRoute
            allowedRoles={["FLEET_MANAGER", "FINANCIAL_ANALYST"]}
          >
            <Layout>
              <FuelLogs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute
            allowedRoles={["FINANCIAL_ANALYST", "FLEET_MANAGER"]}
          >
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
=======
          <Layout>
            <Trips />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
>>>>>>> jay-frontend
