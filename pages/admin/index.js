import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    // Replace with your actual admin password!
    if (password === "YOUR_ADMIN_PASSWORD") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  if (!authenticated) {
    return (
      <div style={{ padding: 32, maxWidth: 350, margin: "0 auto" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8, fontSize: 16 }}
          />
          <button
            type="submit"
            style={{ width: "100%", padding: 8, fontSize: 16 }}
          >
            Login
          </button>
          {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link href="/admin/players">Manage Players</Link></li>
        <li><Link href="/admin/add-week">Add Weekly Results</Link></li>
        <li><Link href="/admin/events">Manage Events</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
}