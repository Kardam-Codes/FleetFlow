import { useEffect, useState } from "react"
import { api } from "../api/api"

export default function FuelLogs() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchFuelLogs() {
      const response = await api.get("/fuel")
      if (!response.success) {
        setError(response.message)
        setLoading(false)
        return
      }

      setRows(response.data || [])
      setLoading(false)
    }

    fetchFuelLogs()
  }, [])

  if (loading) return <p>Loading fuel logs...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h2>Fuel Logs</h2>
      <p>Total records: {rows.length}</p>
    </div>
  )
}
