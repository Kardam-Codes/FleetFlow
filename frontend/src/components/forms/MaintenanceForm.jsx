import { useState } from "react"
import { api } from "../../api/api"

export default function MaintenanceForm({ vehicles = [], onSuccess }) {
  const [form, setForm] = useState({
    vehicle_id: "",
    description: "",
    cost: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    if (!form.vehicle_id) return "Select vehicle"
    if (!form.description.trim()) return "Description required"
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

    const response = await api.post("/maintenance", {
      ...form,
      cost: Number(form.cost),
    })

    setLoading(false)

    if (!response.success) {
      setError(response.message)
      return
    }

    setForm({
      vehicle_id: "",
      description: "",
      cost: "",
    })

    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Maintenance</h3>

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

      <input
        name="description"
        placeholder="Service Description"
        value={form.description}
        onChange={handleChange}
      />

      <input
        name="cost"
        type="number"
        placeholder="Cost"
        value={form.cost}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Record"}
      </button>
    </form>
  )
}