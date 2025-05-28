import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLogin from "../../components/AdminLogin";
import EventManagement from "../../components/EventManagement";
import PlayerManagement from "../../components/PlayerManagement";
import WeeklyResultsManagement from "../../components/WeeklyResultsManagement";
import Messaging from "../../components/Messaging";
import News from "../../components/News";
import WeeklyRoundManagement from "../../components/WeeklyRoundManagement";
import PrizePayouts from "../../components/PrizePayouts";
import ScoringSystemToggle from "../../components/ScoringSystemToggle";
import { getAdminToken, removeAdminToken, getProtectedAdminData } from "../../utils/api";

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
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("events");
  const [checking, setChecking] = useState(true);

  // On mount, check for token and verify it
  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      setLoggedIn(false);
      setChecking(false);
      return;
    }
    getProtectedAdminData().then((d) => {
      if (d && !d.error) {
        setLoggedIn(true);
        setChecking(false);
      } else {
        setError(d.error || "Session expired. Please log in again.");
        removeAdminToken();
        setLoggedIn(false);
        setChecking(false);
      }
    });
  }, []);

  if (checking) {
    return <div>Loading...</div>;
  }

  if (!loggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>
        <AdminLogin
          onLogin={() => {
            setLoggedIn(true);
            setError("");
          }}
        />
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
            removeAdminToken();
            setLoggedIn(false);
            setError("");
            setTab("events");
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