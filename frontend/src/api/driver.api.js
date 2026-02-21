/**
 * FILE: driver.api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Driver-related API abstraction
 */

import { api } from "./api"

export const driverApi = {
  getAll: () => api.get("/drivers"),

  getById: (id) =>
    api.get(`/drivers/${id}`),

  create: (data) =>
    api.post("/drivers", data),

  update: (id, data) =>
    api.patch(`/drivers/${id}/status`, data),

  suspend: (id) =>
    api.patch(`/drivers/${id}/status`, { status: "SUSPENDED" }),

  setStatus: (id, status) =>
    api.patch(`/drivers/${id}/status`, { status }),

  remove: (id) =>
    api.delete(`/drivers/${id}`),
}

export const getDrivers = () => driverApi.getAll()
