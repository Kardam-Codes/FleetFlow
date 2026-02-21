import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const result = await login(form)

    if (!result?.success) {
      setError(result?.message || "Invalid credentials")
      setLoading(false)
      return
    }

    navigate(result.redirectTo || "/dashboard", { replace: true })
  }

  return (
    <div style={styles.wrapper}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2>FleetFlow Login</h2>

        <label style={styles.label} htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
          style={styles.input}
        />

        <label style={styles.label} htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          required
          style={styles.input}
        />

        {error ? <p style={styles.error}>{error}</p> : null}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  )
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#0f1115",
    padding: "16px",
  },
  form: {
    width: "100%",
    maxWidth: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#151821",
    border: "1px solid #262b36",
    borderRadius: "12px",
    padding: "24px",
    color: "#e6e8ec",
  },
  label: {
    fontSize: "14px",
    color: "#9aa3b2",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #262b36",
    outline: "none",
    background: "#1c1f2a",
    color: "#e6e8ec",
  },
  button: {
    marginTop: "6px",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 600,
  },
  error: {
    margin: 0,
    color: "#ef4444",
    fontSize: "13px",
  },
}
