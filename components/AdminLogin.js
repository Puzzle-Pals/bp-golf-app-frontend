import { useState } from "react";
import Router from "next/router";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      Router.replace("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1B4D3E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#3C2F2F',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: 400
      }}>
        <h2 style={{ color: "#F5E8C7", fontWeight: "bold", marginBottom: "1.5rem", fontSize: "1.7rem", textAlign: 'center' }}>Admin Login</h2>
        {error && <p style={{ color: "#C71585" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ color: "#F5E8C7", display: "block", marginBottom: 4 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid #F5E8C7", background: "#1B4D3E", color: "#F5E8C7" }}
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#C71585",
              color: "#F5E8C7",
              padding: "0.6rem 1rem",
              borderRadius: "0.25rem",
              fontWeight: "bold",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              transition: "background-color 0.2s, color 0.2s"
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}