/**
 * FILE: analytics.api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Operational analytics API abstraction
 */

import { api } from "./api"

export const analyticsApi = {
  getDashboardStats: (params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value)
    ).toString()
    const suffix = query ? `?${query}` : ""
    return api.get(`/analytics/dashboard${suffix}`)
  },

  getFuelEfficiency: () =>
    api.get("/analytics/fuel-efficiency"),

  getROI: () =>
    api.get("/analytics/roi"),

  getCostPerKm: () =>
    api.get("/analytics/cost-per-km"),
}

export const getAnalyticsOverview = () => analyticsApi.getDashboardStats()
