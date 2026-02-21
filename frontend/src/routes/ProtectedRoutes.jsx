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

  if (loading) {
    return <p>Checking authentication...</p>
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Role restriction check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
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

  if (loading) {
    return <p>Checking authentication...</p>
  }

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Role restriction check
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}