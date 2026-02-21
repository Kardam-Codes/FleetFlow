/**
 * FILE: analytics.api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Operational analytics API abstraction
 */

import { api } from "./api"

export const analyticsApi = {
  getDashboardStats: () =>
    api.get("/analytics/dashboard"),

  getFuelEfficiency: () =>
    api.get("/analytics/fuel-efficiency"),

  getROI: () =>
    api.get("/analytics/roi"),

  getCostPerKm: () =>
    api.get("/analytics/cost-per-km"),
}

export const getAnalyticsOverview = () => analyticsApi.getDashboardStats()
