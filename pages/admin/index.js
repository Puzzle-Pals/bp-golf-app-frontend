import { useState } from "react";
import Link from "next/link";

const ADMIN_PASSWORD = "YOUR_ADMIN_PASSWORD"; // Replace with your actual password

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState("dashboard");

  function handleLogin(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  // Recipe card/tabbed layout CSS:
  const cardStyle = {
    background: "#fff",
    borderRadius: "1rem",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    maxWidth: 600,
    margin: "48px auto",
    padding: "2rem 2rem 1.5rem 2rem"
  };
  const tabsStyle = {
    display: "flex",
    borderBottom: "1px solid #eee",
    marginBottom: "1.25rem"
  };
  const tabStyle = (active) => ({
    cursor: "pointer",
    fontWeight: active ? 700 : 400,
    color: active ? "#00b894" : "#444",
    borderBottom: active ? "2px solid #00b894" : "2px solid transparent",
    padding: "0.75rem 1.5rem",
    background: "none",
    outline: "none"
  });

  // Tab content (dashboard, players, week, events)
  function renderTab() {
    switch (selectedTab) {
      case "dashboard":
        return (
          <div>
            <h2>Admin Dashboard</h2>
            <ul>
              <li><Link href="/admin/players">Manage Players</Link></li>
              <li><Link href="/admin/add-week">Add Weekly Results</Link></li>
              <li><Link href="/admin/events">Manage Events</Link></li>
            </ul>
          </div>
        );
      case "players":
        return (
          <div>
            <h2>Manage Players</h2>
            <p>Go to <Link href="/admin/players">Players Admin Page</Link></p>
          </div>
        );
      case "week":
        return (
          <div>
            <h2>Add Weekly Results</h2>
            <p>Go to <Link href="/admin/add-week">Add Week Page</Link></p>
          </div>
        );
      case "events":
        return (
          <div>
            <h2>Manage Events</h2>
            <p>Go to <Link href="/admin/events">Events Page</Link></p>
          </div>
        );
      default:
        return null;
    }
  }

  if (!auth) {
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
              style={{
                width: "100%",
                padding: "0.75rem",
                fontSize: "1.1rem",
                borderRadius: "0.5rem",
                border: "1px solid #ddd",
                marginBottom: "1.25rem",
                background: "#f6f6f6"
              }}
            />
            <button
              type="submit"
              style={{
                background: "#00b894",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                padding: "0.8rem 0",
                width: "100%",
                fontSize: "1rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                cursor: "pointer"
              }}
            >
              Login
            </button>
            {error && <div style={{ color: "#d63031", marginTop: 16 }}>{error}</div>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f2f2f2" }}>
      <div style={cardStyle}>
        <nav style={tabsStyle}>
          <button style={tabStyle(selectedTab === "dashboard")} onClick={() => setSelectedTab("dashboard")}>Dashboard</button>
          <button style={tabStyle(selectedTab === "players")} onClick={() => setSelectedTab("players")}>Players</button>
          <button style={tabStyle(selectedTab === "week")} onClick={() => setSelectedTab("week")}>Weekly Results</button>
          <button style={tabStyle(selectedTab === "events")} onClick={() => setSelectedTab("events")}>Events</button>
        </nav>
        <section>
          {renderTab()}
        </section>
      </div>
    </main>
  );
}