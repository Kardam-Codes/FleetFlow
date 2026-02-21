import { useEffect, useState } from "react"
import { api } from "../api/api"

export default function Maintenance() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchMaintenance() {
      const response = await api.get("/maintenance")
      if (!response.success) {
        setError(response.message)
        setLoading(false)
        return
      }

      setRows(response.data || [])
      setLoading(false)
    }

    fetchMaintenance()
  }, [])

  if (loading) return <p>Loading maintenance logs...</p>
  if (error) return <p style={{ color: "red" }}>{error}</p>

  return (
    <div>
      <h2>Maintenance Logs</h2>
      <p>Total records: {rows.length}</p>
    </div>
  )
}
