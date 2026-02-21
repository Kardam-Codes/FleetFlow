import { createContext, useContext, useEffect, useState } from "react"
import { authApi } from "../api/auth.api"

/**
 * AuthContext
 * Central authentication state manager
 */

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  /**
   * Load auth state from localStorage on app start
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  /**
   * Login function
   */
  async function login(credentials) {
    const response = await authApi.login(credentials)

    if (!response.success) {
      return response
    }

    const { token, user } = response.data

    // Persist
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    setToken(token)
    setUser(user)

    return { success: true }
  }

  /**
   * Logout function
   */
  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setToken(null)
    setUser(null)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook
 */
export function useAuth() {
  return useContext(AuthContext)
}