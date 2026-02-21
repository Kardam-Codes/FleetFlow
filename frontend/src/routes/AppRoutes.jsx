import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"

// Public Page
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

// Layout (Assuming Jay created a Layout wrapper)
import Layout from "../components/layout/Layout"

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===================== */}
      {/* Public Route */}
      {/* ===================== */}
      <Route path="/login" element={<Login />} />

      {/* ===================== */}
      {/* Protected Routes */}
      {/* ===================== */}
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
          <ProtectedRoute>
            <Layout>
              <Vehicles />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drivers"
        element={
          <ProtectedRoute>
            <Layout>
              <Drivers />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/trips"
        element={
          <ProtectedRoute>
            <Layout>
              <Trips />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance"
        element={
          <ProtectedRoute>
            <Layout>
              <Maintenance />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/fuel"
        element={
          <ProtectedRoute>
            <Layout>
              <FuelLogs />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}