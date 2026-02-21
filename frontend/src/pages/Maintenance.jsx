import { useEffect, useState } from "react"
import DataTable from "../components/common/DataTable"
import { maintenanceApi } from "../api/maintenance.api"
import { vehicleApi } from "../api/vehicle.api"

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
    const response = await maintenanceApi.getAll()
    if (!response.success) {
      setError(response.message)
      return
    }

    setRows(response.data?.data || [])
  }

  async function fetchVehicles() {
    const response = await vehicleApi.getAll()
    if (!response.success) return

    setVehicles((response.data?.data || []).filter((vehicle) => vehicle.status !== "IN_SHOP"))
  }

  async function handleCreate(event) {
    event.preventDefault()
    setError("")

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
    <div>
      <h2>Maintenance Logs</h2>

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

      {error ? <p style={{ color: "#ef4444" }}>{error}</p> : null}

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
