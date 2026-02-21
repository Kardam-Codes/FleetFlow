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
    api.put(`/drivers/${id}`, data),

  suspend: (id) =>
    api.put(`/drivers/${id}/suspend`),
}