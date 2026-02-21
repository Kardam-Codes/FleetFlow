import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

/**
 * ProtectedRoute
 *
 * Supports:
 * - Authentication check
 * - Role-based access restriction
 */

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, loading } = useAuth()
  const normalizedRole = String(user?.role || "").toUpperCase()
  const normalizedAllowedRoles = allowedRoles.map((role) => String(role).toUpperCase())

  if (loading) {
    return <p>Checking authentication...</p>
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Role restriction check
  if (normalizedAllowedRoles.length > 0 && !normalizedAllowedRoles.includes(normalizedRole)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
