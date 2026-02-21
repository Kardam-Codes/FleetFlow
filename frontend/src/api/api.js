/**
 * FILE: api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Central HTTP abstraction layer.
 *
 * RULES:
 * - No UI logic
 * - No business logic
 * - Only network handling
 */

const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"

/**
 * Internal request handler
 */
async function request(method, endpoint, body = null) {
  const token = localStorage.getItem("token")

  const headers = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    })

    const data = await response.json().catch(() => null)

    return {
      success: response.ok,
      status: response.status,
      data,
      message:
        data?.message ||
        (response.ok ? "Request successful" : "Request failed"),
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      message: "Network error. Please check your connection.",
    }
  }
}

/**
 * Public API methods
 */
export const api = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, body) => request("POST", endpoint, body),
  put: (endpoint, body) => request("PUT", endpoint, body),
  patch: (endpoint, body) => request("PATCH", endpoint, body),
  delete: (endpoint) => request("DELETE", endpoint),
}
