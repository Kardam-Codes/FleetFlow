import { useState } from "react"
import { driverApi } from "../../api/driver.api"

export default function DriverForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    license_number: "",
    license_expiry: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function validate() {
    if (!form.name.trim()) return "Name is required"
    if (!form.license_number.trim()) return "License number required"
    if (!form.license_expiry) return "License expiry required"
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

    const response = await driverApi.create(form)

    setLoading(false)

    if (!response.success) {
      setError(response.message)
      return
    }

    setForm({
      name: "",
      license_number: "",
      license_expiry: "",
    })

    if (onSuccess) onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Driver</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        name="name"
        placeholder="Driver Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="license_number"
        placeholder="License Number"
        value={form.license_number}
        onChange={handleChange}
      />

      <input
        name="license_expiry"
        type="date"
        value={form.license_expiry}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Driver"}
      </button>
    </form>
  )
}