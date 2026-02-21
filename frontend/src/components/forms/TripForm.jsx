import { useState } from "react"
import { tripApi } from "../../api/trip.api"

export default function TripForm({ vehicles = [], drivers = [], onSuccess }) {
  const [form, setForm] = useState({
    vehicle_id: "",
    driver_id: "",
    cargo_weight: "",
    revenue: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    if (!form.vehicle_id) return "Select vehicle"
    if (!form.driver_id) return "Select driver"
    if (!form.cargo_weight) return "Cargo weight required"
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)

    const response = await tripApi.create({
      ...form,
      cargo_weight: Number(form.cargo_weight),
      revenue: Number(form.revenue),
    })

    setLoading(false)

    if (!response.success) {
      setError(response.message)
      return
    }

    setForm({
      vehicle_id: "",
      driver_id: "",
      cargo_weight: "",
      revenue: "",
    })

    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Trip</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <select
        name="vehicle_id"
        value={form.vehicle_id}
        onChange={handleChange}
      >
        <option value="">Select Vehicle</option>
        {vehicles.map((v) => (
          <option key={v.id} value={v.id}>
            {v.license_plate}
          </option>
        ))}
      </select>

      <select
        name="driver_id"
        value={form.driver_id}
        onChange={handleChange}
      >
        <option value="">Select Driver</option>
        {drivers.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <input
        name="cargo_weight"
        type="number"
        placeholder="Cargo Weight (kg)"
        value={form.cargo_weight}
        onChange={handleChange}
      />

      <input
        name="revenue"
        type="number"
        placeholder="Revenue"
        value={form.revenue}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Trip"}
      </button>
    </form>
  )
}