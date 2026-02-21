import { createContext, useContext, useEffect, useState } from "react"
import { authApi } from "../api/auth.api"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  async function login(credentials) {
    const response = await authApi.login(credentials)

    if (!response.success) {
      return response
    }

    const { token, user } = response.data

    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    setToken(token)
    setUser(user)

    return {
      success: true,
      redirectTo: getDefaultRoute(user.role),
    }
  }

  function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setUser(null)
  }

  function getDefaultRoute(role) {
    switch (role) {
      case "FLEET_MANAGER":
        return "/dashboard"
      case "DISPATCHER":
        return "/trips"
      case "SAFETY_OFFICER":
        return "/drivers"
      case "FINANCIAL_ANALYST":
        return "/analytics"
      default:
        return "/dashboard"
    }
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
    getDefaultRoute,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}