import { useState } from "react"
import { vehicleApi } from "../../api/vehicle.api"

export default function VehicleForm({ onSuccess }) {
  const [form, setForm] = useState({
    license_plate: "",
    max_capacity: "",
    acquisition_cost: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    if (!form.license_plate.trim()) return "License plate is required"
    if (!form.max_capacity) return "Max capacity is required"
    if (Number(form.max_capacity) <= 0) return "Capacity must be positive"
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

    const response = await vehicleApi.create({
      ...form,
      max_capacity: Number(form.max_capacity),
      acquisition_cost: Number(form.acquisition_cost),
    })

    setLoading(false)

    if (!response.success) {
      setError(response.message)
      return
    }

    setForm({
      license_plate: "",
      max_capacity: "",
      acquisition_cost: "",
    })

    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Vehicle</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="license_plate"
        placeholder="License Plate"
        value={form.license_plate}
        onChange={handleChange}
      />

      <input
        name="max_capacity"
        type="number"
        placeholder="Max Capacity (kg)"
        value={form.max_capacity}
        onChange={handleChange}
      />

      <input
        name="acquisition_cost"
        type="number"
        placeholder="Acquisition Cost"
        value={form.acquisition_cost}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Vehicle"}
      </button>
    </form>
  )
}