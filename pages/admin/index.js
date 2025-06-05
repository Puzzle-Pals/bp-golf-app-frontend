import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Replace with your actual admin password!
  const ADMIN_PASSWORD = "YOUR_ADMIN_PASSWORD";

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  // Recipe card style container
  const cardStyle = {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    maxWidth: 400,
    margin: "48px auto",
    padding: "2rem 2rem 1rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const buttonStyle = {
    background: "#00b894",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    marginTop: "1.25rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "0.5rem",
    border: "1px solid #ddd",
    marginBottom: "1rem"
  };

  const linkCardStyle = {
    background: "#f9f9f9",
    borderRadius: "0.75rem",
    padding: "1.25rem",
    margin: "0.5rem 0",
    boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
    width: "100%",
    textAlign: "center"
  };

  const linkStyle = {
    color: "#0984e3",
    textDecoration: "none",
    fontWeight: 600
  };

  if (!authenticated) {
    return (
      <main style={{ minHeight: "100vh", background: "#f2f2f2" }}>
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "1.5rem", color: "#222" }}>Admin Login</h2>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>Login</button>
            {error && <div style={{ color: "#d63031", marginTop: 16 }}>{error}</div>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f2f2f2" }}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "1.5rem", color: "#222" }}>Admin Dashboard</h1>
        <div style={{ width: "100%" }}>
          <div style={linkCardStyle}>
            <Link href="/admin/players" style={linkStyle}>Manage Players</Link>
          </div>
          <div style={linkCardStyle}>
            <Link href="/admin/add-week" style={linkStyle}>Add Weekly Results</Link>
          </div>
          <div style={linkCardStyle}>
            <Link href="/admin/events" style={linkStyle}>Manage Events</Link>
          </div>
          {/* Add more recipe card links as needed */}
        </div>
      </div>
    </main>
  );
}