/**
 * FILE: trip.api.js
 * OWNER: Kardam
 *
 * PURPOSE:
 * Trip lifecycle API abstraction
 */

import { api } from "./api"

export const tripApi = {
  getAll: () => api.get("/trips"),

  getById: (id) =>
    api.get(`/trips/${id}`),

  create: (data) =>
    api.post("/trips", data),

  dispatch: (id) =>
    api.put(`/trips/${id}/dispatch`),

  complete: (id, completionData) =>
    api.put(`/trips/${id}/complete`, completionData),

  cancel: (id) =>
    api.put(`/trips/${id}/cancel`),
}

export const getTrips = () => tripApi.getAll()
