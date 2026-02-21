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

  create: (data) =>
    api.post("/vehicles", data),

  update: (id, data) =>
    api.patch(`/vehicles/${id}`, data),

  changeStatus: (id, status) =>
    api.patch(`/vehicles/${id}/status`, { status }),
}

export const getVehicles = () => vehicleApi.getAll()
