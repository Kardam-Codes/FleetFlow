import { useEffect, useState } from "react"
import DataTable from "../components/common/DataTable"
import { fuelApi } from "../api/fuel.api"
import { tripApi } from "../api/trip.api"
import { USE_MOCK_DATA, mockFuelLogs, mockTrips } from "../mock/demoData"

const defaultForm = {
  trip_id: "",
  liters: "",
  cost: "",
}

export default function FuelLogs() {
  const [rows, setRows] = useState([])
  const [trips, setTrips] = useState([])
  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    bootstrap()
  }, [])

  async function bootstrap() {
    setLoading(true)
    await Promise.all([fetchFuelLogs(), fetchTrips()])
    setLoading(false)
  }

  async function fetchFuelLogs() {
    if (USE_MOCK_DATA) {
      setRows(mockFuelLogs)
      return
    }

    const response = await fuelApi.getAll()
    if (!response.success) {
      setError(response.message)
      return
    }

    setRows(response.data?.data || [])
  }

  async function fetchTrips() {
    if (USE_MOCK_DATA) {
      const validTrips = mockTrips.filter((trip) => ["DISPATCHED", "COMPLETED"].includes(trip.status))
      setTrips(validTrips)
      return
    }

    const response = await tripApi.getAll()
    if (!response.success) return

    const validTrips = (response.data?.data || []).filter((trip) => ["DISPATCHED", "COMPLETED"].includes(trip.status))
    setTrips(validTrips)
  }

  async function handleCreate(event) {
    event.preventDefault()
    setError("")

    if (USE_MOCK_DATA) {
      const selectedTrip = trips.find((trip) => trip.id === form.trip_id)
      if (!selectedTrip) {
        setError("Select a valid trip")
        return
      }

      setRows((prev) => [
        {
          id: `fuel-${Date.now()}`,
          trip_id: form.trip_id,
          vehicle_id: selectedTrip.vehicle_name,
          liters: Number(form.liters),
          cost: Number(form.cost),
          fuel_date: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ])
      setForm(defaultForm)
      return
    }

    const response = await fuelApi.create({
      ...form,
      liters: Number(form.liters),
      cost: Number(form.cost),
    })

    if (!response.success) {
      setError(response.message || "Failed to create fuel log")
      return
    }

    setForm(defaultForm)
    await bootstrap()
  }

  const columns = [
    { key: "trip_id", label: "Trip" },
    { key: "vehicle_id", label: "Vehicle" },
    { key: "liters", label: "Liters" },
    { key: "cost", label: "Cost" },
    { key: "fuel_date", label: "Date" },
  ]

  return (
    <div className="ff-page">
      <div>
        <h2 className="ff-page-title">Completed Trip, Expense & Fuel Logging</h2>
        <p className="ff-page-subtitle">Track liters, cost, and fuel records against active/completed trips.</p>
      </div>

      <form onSubmit={handleCreate} className="ff-form-grid">
        <select
          className="ff-field"
          required
          value={form.trip_id}
          onChange={(event) => setForm((prev) => ({ ...prev, trip_id: event.target.value }))}
        >
          <option value="">Select Trip</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.vehicle_name || trip.license_plate} | {trip.id.slice(0, 8)}
            </option>
          ))}
        </select>
        <input
          className="ff-field"
          required
          type="number"
          placeholder="Liters"
          value={form.liters}
          onChange={(event) => setForm((prev) => ({ ...prev, liters: event.target.value }))}
        />
        <input
          className="ff-field"
          required
          type="number"
          placeholder="Cost"
          value={form.cost}
          onChange={(event) => setForm((prev) => ({ ...prev, cost: event.target.value }))}
        />
        <button type="submit" className="ff-btn-primary">Add Fuel Entry</button>
      </form>

      {error ? <p className="ff-error">{error}</p> : null}

      <DataTable columns={columns} data={rows} loading={loading} />
    </div>
  )
}
