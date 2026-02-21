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

  create: (data) =>
    api.post("/trips", data),

  dispatch: (id) =>
    api.patch(`/trips/${id}/dispatch`),

  complete: (id, completionData) =>
    api.patch(`/trips/${id}/complete`, completionData),

  cancel: (id) =>
    api.patch(`/trips/${id}/cancel`),

  remove: (id) =>
    api.delete(`/trips/${id}`),
}

export const getTrips = () => tripApi.getAll()
