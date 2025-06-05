import { useState } from "react";
import Link from "next/link";

// Tab icons (simple SVGs for demonstration)
const icons = {
  Players: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><circle cx="10" cy="7" r="4" stroke="#20504F" strokeWidth="2"/><rect x="4" y="13" width="12" height="5" rx="2.5" stroke="#20504F" strokeWidth="2"/></svg>
  ),
  Events: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><rect x="3" y="5" width="14" height="12" rx="2" stroke="#20504F" strokeWidth="2"/><path d="M7 3v4M13 3v4" stroke="#20504F" strokeWidth="2"/></svg>
  ),
  WeeklyResults: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><rect x="4" y="4" width="12" height="12" rx="3" stroke="#20504F" strokeWidth="2"/><path d="M8 12l2-2 2 2" stroke="#20504F" strokeWidth="2"/></svg>
  ),
  News: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><rect x="3" y="5" width="14" height="10" rx="2" stroke="#20504F" strokeWidth="2"/><path d="M7 9h6" stroke="#20504F" strokeWidth="2"/></svg>
  ),
  Messaging: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><rect x="3" y="4" width="14" height="12" rx="4" stroke="#20504F" strokeWidth="2"/><path d="M7 9h6" stroke="#20504F" strokeWidth="2"/></svg>
  ),
  PrizePayouts: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><circle cx="10" cy="10" r="7" stroke="#20504F" strokeWidth="2"/><path d="M7 10h6M10 7v6" stroke="#20504F" strokeWidth="2"/></svg>
  ),
  ScoringSystem: (
    <svg width="20" height="20" fill="none" style={{ marginRight: 8 }}><rect x="4" y="4" width="12" height="12" rx="3" stroke="#20504F" strokeWidth="2"/><circle cx="10" cy="10" r="3" stroke="#20504F" strokeWidth="2"/></svg>
  ),
};

// Tab content components
function PlayersCard() {
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Manage Players</h3>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Player Name</label>
          <input type="text" placeholder="Enter player name"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Email Address</label>
          <input type="email" placeholder="Enter email address"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <button type="submit"
                style={{
                  background: "linear-gradient(90deg,#29947B,#155853)",
                  color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
                  padding: "10px 32px", fontSize: 16, marginTop: 10, cursor: "pointer", boxShadow: "0 1px 5px #dbece6"
                }}>
          Save Player
        </button>
      </form>
    </div>
  );
}

function EventsCard() {
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Manage Events</h3>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Event Name</label>
          <input type="text" placeholder="Enter event name"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Date</label>
          <input type="date" style={{
            width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
            color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <button type="submit"
                style={{
                  background: "linear-gradient(90deg,#29947B,#155853)",
                  color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
                  padding: "10px 32px", fontSize: 16, marginTop: 10, cursor: "pointer", boxShadow: "0 1px 5px #dbece6"
                }}>
          Save Event
        </button>
      </form>
    </div>
  );
}

function WeeklyResultsCard() {
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Manage Weekly Results</h3>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Week #</label>
          <input type="number" min={1} placeholder="Week number"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Winner Name</label>
          <input type="text" placeholder="Winner"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <button type="submit"
                style={{
                  background: "linear-gradient(90deg,#29947B,#155853)",
                  color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
                  padding: "10px 32px", fontSize: 16, marginTop: 10, cursor: "pointer", boxShadow: "0 1px 5px #dbece6"
                }}>
          Save Result
        </button>
      </form>
    </div>
  );
}

function NewsCard() {
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Post League News</h3>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Headline</label>
          <input type="text" placeholder="Headline"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>News Body</label>
          <textarea rows={3} placeholder="Type news details..."
                    style={{
                      width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                      color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0", resize: "vertical" }} />
        </div>
        <button type="submit"
                style={{
                  background: "linear-gradient(90deg,#29947B,#155853)",
                  color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
                  padding: "10px 32px", fontSize: 16, marginTop: 10, cursor: "pointer", boxShadow: "0 1px 5px #dbece6"
                }}>
          Post News
        </button>
      </form>
    </div>
  );
}

function MessagingCard() {
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Send Announcement</h3>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Message to Players</label>
          <textarea rows={3} placeholder="Type your message here..."
                    style={{
                      width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                      color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0", resize: "vertical" }} />
        </div>
        <button type="submit"
                style={{
                  background: "linear-gradient(90deg,#29947B,#155853)",
                  color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
                  padding: "10px 32px", fontSize: 16, marginTop: 10, cursor: "pointer", boxShadow: "0 1px 5px #dbece6"
                }}>
          Send Message
        </button>
      </form>
    </div>
  );
}

function PrizePayoutsCard() {
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Prize Payouts</h3>
      <form>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Week #</label>
          <input type="number" placeholder="Week #"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Winner Name</label>
          <input type="text" placeholder="Winner"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", color: "#30635E", fontWeight: 500, marginBottom: 4 }}>Payout Amount</label>
          <input type="number" placeholder="Payout $"
                 style={{
                   width: "100%", padding: 10, borderRadius: 7, border: "1px solid #DDE5E0", background: "#F8FAF9",
                   color: "#102A23", fontSize: 16, boxShadow: "0 1px 1.5px #e0e0e0" }} />
        </div>
        <button type="submit"
                style={{
                  background: "linear-gradient(90deg,#29947B,#155853)",
                  color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
                  padding: "10px 32px", fontSize: 16, marginTop: 10, cursor: "pointer", boxShadow: "0 1px 5px #dbece6"
                }}>
          Save Payout
        </button>
      </form>
    </div>
  );
}

function ScoringSystemCard() {
  const [system, setSystem] = useState("Standard");
  return (
    <div>
      <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" }}>Scoring System</h3>
      <div style={{ marginBottom: 14 }}>
        <span style={{ color: "#20504F", fontWeight: 600 }}>Current System:</span>{" "}
        <span style={{ color: "#155853", fontWeight: 700 }}>{system}</span>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setSystem("Standard")}
          style={{
            background: system === "Standard" ? "linear-gradient(90deg,#29947B,#155853)" : "#F8FAF9",
            color: system === "Standard" ? "#FFF" : "#20504F",
            border: "1px solid #20504F",
            borderRadius: 6,
            padding: "10px 32px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Standard
        </button>
        <button
          type="button"
          onClick={() => setSystem("Handicap")}
          style={{
            background: system === "Handicap" ? "linear-gradient(90deg,#29947B,#155853)" : "#F8FAF9",
            color: system === "Handicap" ? "#FFF" : "#20504F",
            border: "1px solid #20504F",
            borderRadius: 6,
            padding: "10px 32px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Handicap
        </button>
      </div>
    </div>
  );
}

// Main
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Players");
  const tabs = [
    { key: "Players", label: "Players", body: <PlayersCard /> },
    { key: "Events", label: "Events", body: <EventsCard /> },
    { key: "WeeklyResults", label: "Weekly Results", body: <WeeklyResultsCard /> },
    { key: "News", label: "News", body: <NewsCard /> },
    { key: "Messaging", label: "Messaging", body: <MessagingCard /> },
    { key: "PrizePayouts", label: "Prize Payouts", body: <PrizePayoutsCard /> },
    { key: "ScoringSystem", label: "Scoring System", body: <ScoringSystemCard /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#E5F3EF 0%,#CCE8E1 100%)" }}>
      {/* Top nav */}
      <nav style={{ backgroundColor: "#20504F", padding: "1rem 0", boxShadow: "0 2px 8px rgba(32,80,79,0.07)" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <Link href="/" style={{ color: "#F5E8C7", fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none", letterSpacing: 0.5 }}>
            BP Men’s League (Admin)
          </Link>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" style={{ color: "#F5E8C7", textDecoration: "none" }}>Home</Link>
            <Link href="/leaderboard" style={{ color: "#F5E8C7", textDecoration: "none" }}>Leaderboard</Link>
            <Link href="/player-stats" style={{ color: "#F5E8C7", textDecoration: "none" }}>Player Stats</Link>
            <Link href="/weekly-results" style={{ color: "#F5E8C7", textDecoration: "none" }}>Weekly Results</Link>
            <Link href="/news" style={{ color: "#F5E8C7", textDecoration: "none" }}>News</Link>
            <Link href="/admin" style={{
              color: "#F5E8C7", textDecoration: "none", fontWeight: "bold", borderBottom: "2px solid #DDE5E0"
            }}>Admin</Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "2.5rem", letterSpacing: "1px", color: "#20504F" }}>
          Admin Dashboard
        </h1>
        {/* Tab bar */}
        <div style={{
          display: "flex", gap: "0.5rem", marginBottom: "2.5rem", borderBottom: "2px solid #E0E7E4",
          overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none"
        }}>
          {tabs.map(tab => (
            <button key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                background: activeTab === tab.key ? "#E5F3EF" : "transparent",
                color: activeTab === tab.key ? "#155853" : "#20504F",
                border: "none",
                borderBottom: activeTab === tab.key ? "3px solid #155853" : "3px solid transparent",
                outline: "none",
                fontWeight: 600,
                fontSize: 16,
                padding: "1rem 1.5rem 0.75rem 1.2rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                boxShadow: activeTab === tab.key ? "0 2px 12px #DDE5E0" : "none",
                borderRadius: "12px 12px 0 0"
              }}>
              {icons[tab.key]}
              {tab.label}
            </button>
          ))}
        </div>
        {/* Card */}
        <section style={{
          background: "#fff",
          borderRadius: "1.5rem",
          boxShadow: "0 4px 32px rgba(32,80,79,0.07)",
          padding: "2.5rem 2rem",
          color: "#102A23",
          minHeight: 300,
          marginBottom: "5rem"
        }}>
          {tabs.find(tab => tab.key === activeTab)?.body}
        </section>
      </main>
    </div>
  );
}