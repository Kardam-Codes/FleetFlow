import { api } from "./api"

export const maintenanceApi = {
  getAll: () => api.get("/maintenance"),
  create: (data) => api.post("/maintenance", data),
  complete: (vehicleId) => api.patch(`/maintenance/vehicle/${vehicleId}/complete`),
  remove: (id) => api.delete(`/maintenance/${id}`),
}
