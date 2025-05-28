import { useEffect, useState } from "react";
import AdminLogin from "../../components/AdminLogin";
import EventManagement from "../../components/EventManagement";
import PlayerManagement from "../../components/PlayerManagement";
import WeeklyResultsManagement from "../../components/WeeklyResultsManagement";
import Messaging from "../../components/Messaging";
import News from "../../components/News";

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("events");

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Verify token on login or reload
  useEffect(() => {
    if (!loggedIn) return;
    const token = localStorage.getItem("token");
    fetch("/api/admin/protected", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => {
        if (d.error) {
          setError(d.error);
          setLoggedIn(false);
          localStorage.removeItem("token");
        }
      });
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>
        <AdminLogin onLogin={() => setLoggedIn(true)} />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <h1>Admin Dashboard</h1>
      <nav style={{ margin: "24px 0" }}>
        <button onClick={() => setTab("events")} style={{ marginRight: 8 }}>
          Events
        </button>
        <button onClick={() => setTab("players")} style={{ marginRight: 8 }}>
          Players
        </button>
        <button onClick={() => setTab("weeklyResults")} style={{ marginRight: 8 }}>
          Weekly Results
        </button>
        <button onClick={() => setTab("messaging")} style={{ marginRight: 8 }}>
          Messaging
        </button>
        <button onClick={() => setTab("news")} style={{ marginRight: 8 }}>
          News
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
          }}
          style={{ float: "right", background: "#f55", color: "white" }}
        >
          Logout
        </button>
      </nav>
      <div style={{ marginTop: 32 }}>
        {tab === "events" && <EventManagement />}
        {tab === "players" && <PlayerManagement />}
        {tab === "weeklyResults" && <WeeklyResultsManagement />}
        {tab === "messaging" && <Messaging />}
        {tab === "news" && <News />}
      </div>
    </div>
  );
}