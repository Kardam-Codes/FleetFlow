import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import ProtectedRoute from "./ProtectedRoutes"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Vehicles from "../pages/Vehicles"
import Drivers from "../pages/Drivers"
import Trips from "../pages/Trips"
import Maintenance from "../pages/Maintenance"
import FuelLogs from "../pages/FuelLogs"
import Analytics from "../pages/Analytics"
import Layout from "../components/layout/Layout"

export default function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
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

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/vehicles"
        element={
          <ProtectedRoute allowedRoles={["FLEET_MANAGER"]}>
            <Layout>
              <Vehicles />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drivers"
        element={
          <ProtectedRoute allowedRoles={["FLEET_MANAGER", "SAFETY_OFFICER"]}>
            <Layout>
              <Drivers />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trips"
        element={
          <ProtectedRoute allowedRoles={["DISPATCHER", "FLEET_MANAGER"]}>
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
          <ProtectedRoute allowedRoles={["FLEET_MANAGER", "FINANCIAL_ANALYST"]}>
            <Layout>
              <FuelLogs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute allowedRoles={["FINANCIAL_ANALYST", "FLEET_MANAGER"]}>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
