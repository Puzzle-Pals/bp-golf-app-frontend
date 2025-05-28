import { useEffect, useState } from "react";
import AdminLogin from "../../components/AdminLogin";
import EventManagement from "../../components/EventManagement";
import PlayerManagement from "../../components/PlayerManagement";
import WeeklyResultsManagement from "../../components/WeeklyResultsManagement";
import Messaging from "../../components/Messaging";
import News from "../../components/News";
import WeeklyRoundManagement from "../../components/WeeklyRoundManagement";
import PrizePayouts from "../../components/PrizePayouts";
import ScoringSystemToggle from "../../components/ScoringSystemToggle";

const TABS = [
  { key: "events", label: "Events" },
  { key: "players", label: "Players" },
  { key: "weeklyResults", label: "Weekly Results" },
  { key: "weeklyRounds", label: "Weekly Rounds" },
  { key: "prizePayouts", label: "Prize Payouts" },
  { key: "scoringSystem", label: "Scoring System" },
  { key: "messaging", label: "Messaging" },
  { key: "news", label: "News" }
];

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("events");

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
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
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              marginRight: 8,
              background: tab === key ? "#0070f3" : "#eee",
              color: tab === key ? "#fff" : "#000",
              borderRadius: 4,
              padding: "8px 16px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
          }}
          style={{
            float: "right",
            background: "#f55",
            color: "white",
            borderRadius: 4,
            padding: "8px 16px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </nav>
      <div style={{ marginTop: 32 }}>
        {tab === "events" && <EventManagement />}
        {tab === "players" && <PlayerManagement />}
        {tab === "weeklyResults" && <WeeklyResultsManagement />}
        {tab === "weeklyRounds" && <WeeklyRoundManagement />}
        {tab === "prizePayouts" && <PrizePayouts />}
        {tab === "scoringSystem" && <ScoringSystemToggle />}
        {tab === "messaging" && <Messaging />}
        {tab === "news" && <News />}
      </div>
    </div>
  );
}