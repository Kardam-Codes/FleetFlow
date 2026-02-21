import { useEffect, useState } from "react"
import DataTable from "../components/common/DataTable"
import { maintenanceApi } from "../api/maintenance.api"
import { vehicleApi } from "../api/vehicle.api"
import { USE_MOCK_DATA, mockMaintenance, mockVehicles } from "../mock/demoData"

const defaultForm = {
  vehicle_id: "",
  description: "",
  cost: "",
}

export default function Maintenance() {
  const [rows, setRows] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    bootstrap()
  }, [])

  async function bootstrap() {
    setLoading(true)
    await Promise.all([fetchMaintenance(), fetchVehicles()])
    setLoading(false)
  }

  async function fetchMaintenance() {
    if (USE_MOCK_DATA) {
      setRows(mockMaintenance)
      return
    }

    const response = await maintenanceApi.getAll()
    if (!response.success) {
      setError(response.message)
      return
    }

    setRows(response.data?.data || [])
  }

  async function fetchVehicles() {
    if (USE_MOCK_DATA) {
      setVehicles(mockVehicles.filter((vehicle) => vehicle.status !== "IN_SHOP"))
      return
    }

    const response = await vehicleApi.getAll()
    if (!response.success) return

    setVehicles((response.data?.data || []).filter((vehicle) => vehicle.status !== "IN_SHOP"))
  }

  async function handleCreate(event) {
    event.preventDefault()
    setError("")

    if (USE_MOCK_DATA) {
      const selectedVehicle = mockVehicles.find((vehicle) => vehicle.id === form.vehicle_id)
      if (!selectedVehicle) {
        setError("Select a valid vehicle")
        return
      }

      setRows((prev) => [
        {
          id: `mnt-${Date.now()}`,
          vehicle_id: form.vehicle_id,
          license_plate: selectedVehicle.license_plate,
          description: form.description,
          cost: Number(form.cost || 0),
          service_date: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ])
      setForm(defaultForm)
      return
    }

    const response = await maintenanceApi.create({
      ...form,
      cost: Number(form.cost || 0),
    })

    if (!response.success) {
      setError(response.message || "Failed to create maintenance log")
      return
    }

    setForm(defaultForm)
    await bootstrap()
  }

  async function handleComplete(vehicleId) {
    if (USE_MOCK_DATA) {
      setRows((prev) => prev.filter((row) => row.vehicle_id !== vehicleId))
      return
    }

    const response = await maintenanceApi.complete(vehicleId)
    if (!response.success) {
      setError(response.message || "Failed to complete maintenance")
      return
    }

    await bootstrap()
  }

  const columns = [
    { key: "license_plate", label: "Vehicle" },
    { key: "description", label: "Description" },
    { key: "cost", label: "Cost" },
    { key: "service_date", label: "Service Date" },
  ]

  return (
    <div className="ff-page">
      <div>
        <h2 className="ff-page-title">Maintenance & Service Logs</h2>
        <p className="ff-page-subtitle">Create service logs and keep dispatch pool conflict-free.</p>
      </div>

      <form onSubmit={handleCreate} className="ff-form-grid">
        <select
          className="ff-field"
          required
          value={form.vehicle_id}
          onChange={(event) => setForm((prev) => ({ ...prev, vehicle_id: event.target.value }))}
        >
          <option value="">Select Vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.license_plate}
            </option>
          ))}
        </select>
        <input
          className="ff-field"
          required
          placeholder="Service Description"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        />
        <input
          className="ff-field"
          type="number"
          placeholder="Cost"
          value={form.cost}
          onChange={(event) => setForm((prev) => ({ ...prev, cost: event.target.value }))}
        />
        <button type="submit" className="ff-btn-primary">Add Service Log</button>
      </form>

      {error ? <p className="ff-error">{error}</p> : null}

      <DataTable
        columns={columns}
        data={rows}
        loading={loading}
        renderActions={(row) => (
          <button style={actionBtn} onClick={() => handleComplete(row.vehicle_id)}>
            Mark Complete
          </button>
        )}
      />
    </div>
  )
}

const actionBtn = {
  padding: "6px 10px",
  borderRadius: "6px",
  border: "1px solid #262b36",
  background: "transparent",
  color: "#9aa3b2",
  cursor: "pointer",
}
