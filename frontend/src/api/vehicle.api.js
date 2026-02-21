/**
 * FILE: vehicle.api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Vehicle-related API abstraction
 */

import { api } from "./api"

export const vehicleApi = {
  getAll: () => api.get("/vehicles"),

  getById: (id) =>
    api.get(`/vehicles/${id}`),

  create: (data) =>
    api.post("/vehicles", data),

  update: (id, data) =>
    api.put(`/vehicles/${id}`, data),

  remove: (id) =>
    api.delete(`/vehicles/${id}`),
}

export const getVehicles = () => vehicleApi.getAll()
