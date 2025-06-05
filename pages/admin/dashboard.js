import { useState } from "react";
import Link from "next/link";

//--- Example content for each admin section ---//
function PlayersCard() {
  return (
    <div style={{ marginTop: 12 }}>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Player Name
          </label>
          <input
            type="text"
            placeholder="Enter player name"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#C71585",
            color: "#F5E8C7",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Save Player
        </button>
      </form>
    </div>
  );
}

function EventsCard() {
  return (
    <div style={{ marginTop: 12 }}>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Event Name
          </label>
          <input
            type="text"
            placeholder="Enter event name"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Date
          </label>
          <input
            type="date"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#C71585",
            color: "#F5E8C7",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Save Event
        </button>
      </form>
    </div>
  );
}

function WeeklyResultsCard() {
  return (
    <div style={{ marginTop: 12 }}>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Week #
          </label>
          <input
            type="number"
            min={1}
            placeholder="Week number"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Winner Name
          </label>
          <input
            type="text"
            placeholder="Winner"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#C71585",
            color: "#F5E8C7",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Save Result
        </button>
      </form>
    </div>
  );
}

function NewsCard() {
  return (
    <div style={{ marginTop: 12 }}>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            News Headline
          </label>
          <input
            type="text"
            placeholder="Headline"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            News Body
          </label>
          <textarea
            rows={3}
            placeholder="Type news details..."
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
              resize: "vertical",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#C71585",
            color: "#F5E8C7",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Post News
        </button>
      </form>
    </div>
  );
}

function MessagingCard() {
  return (
    <div style={{ marginTop: 12 }}>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Message to Players
          </label>
          <textarea
            rows={3}
            placeholder="Type your message here..."
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
              resize: "vertical",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#C71585",
            color: "#F5E8C7",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

function PrizePayoutsCard() {
  return (
    <div style={{ marginTop: 12 }}>
      <form>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Week #
          </label>
          <input
            type="number"
            placeholder="Week #"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Winner Name
          </label>
          <input
            type="text"
            placeholder="Winner"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", color: "#3C2F2F", fontWeight: 500 }}>
            Payout Amount
          </label>
          <input
            type="number"
            placeholder="Payout $"
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #C71585",
              background: "#F9FAFB",
              color: "#3C2F2F",
              marginTop: 4,
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#C71585",
            color: "#F5E8C7",
            border: "none",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          Save Payout
        </button>
      </form>
    </div>
  );
}

function ScoringSystemCard() {
  const [system, setSystem] = useState("Standard");
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ marginBottom: 12 }}>
        <span style={{ color: "#3C2F2F", fontWeight: 500 }}>Current System:</span>{" "}
        <span style={{ color: "#C71585", fontWeight: 700 }}>{system}</span>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setSystem("Standard")}
          style={{
            background: system === "Standard" ? "#C71585" : "#F9FAFB",
            color: system === "Standard" ? "#F5E8C7" : "#3C2F2F",
            border: "1px solid #C71585",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Standard
        </button>
        <button
          type="button"
          onClick={() => setSystem("Handicap")}
          style={{
            background: system === "Handicap" ? "#C71585" : "#F9FAFB",
            color: system === "Handicap" ? "#F5E8C7" : "#3C2F2F",
            border: "1px solid #C71585",
            borderRadius: 4,
            padding: "0.5rem 1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Handicap
        </button>
      </div>
    </div>
  );
}

//--- Main Admin Dashboard ---//
export default function AdminDashboard() {
  // Which card/tab is open
  const [activeCard, setActiveCard] = useState("Players");

  // All admin sections as recipe cards
  const cards = [
    {
      key: "Players",
      label: "Players",
      body: <PlayersCard />,
    },
    {
      key: "Events",
      label: "Events",
      body: <EventsCard />,
    },
    {
      key: "WeeklyResults",
      label: "Weekly Results",
      body: <WeeklyResultsCard />,
    },
    {
      key: "News",
      label: "News",
      body: <NewsCard />,
    },
    {
      key: "Messaging",
      label: "Messaging",
      body: <MessagingCard />,
    },
    {
      key: "PrizePayouts",
      label: "Prize Payouts",
      body: <PrizePayoutsCard />,
    },
    {
      key: "ScoringSystem",
      label: "Scoring System",
      body: <ScoringSystemCard />,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1B4D3E", color: "#F5E8C7" }}>
      {/* Top nav, matches main site */}
      <nav style={{ backgroundColor: "#3C2F2F", padding: "1rem", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ color: "#F5E8C7", fontSize: "1.5rem", fontWeight: "bold", textDecoration: "none" }}>
            BP Men’s League (Admin)
          </Link>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" style={{ color: "#F5E8C7", textDecoration: "none" }}>Home</Link>
            <Link href="/leaderboard" style={{ color: "#F5E8C7", textDecoration: "none" }}>Leaderboard</Link>
            <Link href="/player-stats" style={{ color: "#F5E8C7", textDecoration: "none" }}>Player Stats</Link>
            <Link href="/weekly-results" style={{ color: "#F5E8C7", textDecoration: "none" }}>Weekly Results</Link>
            <Link href="/news" style={{ color: "#F5E8C7", textDecoration: "none" }}>News</Link>
            <Link href="/admin" style={{ color: "#C71585", textDecoration: "none", fontWeight: "bold" }}>Admin</Link>
          </div>
        </div>
      </nav>

      {/* Cards tab row */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1rem", color: "#F5E8C7" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "2rem", letterSpacing: "1px" }}>
          Admin Dashboard
        </h1>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {cards.map((card) => (
            <button
              key={card.key}
              onClick={() => setActiveCard(card.key)}
              style={{
                background: activeCard === card.key ? "#C71585" : "#3C2F2F",
                color: "#F5E8C7",
                border: activeCard === card.key ? "2px solid #F5E8C7" : "2px solid #C71585",
                borderRadius: "0.5rem",
                padding: "1rem 2rem",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: activeCard === card.key ? "0 4px 16px rgba(199,21,133,0.07)" : "0 2px 8px rgba(0,0,0,0.09)",
                transition: "all 0.18s",
                outline: "none",
                minWidth: 150,
              }}
            >
              {card.label}
            </button>
          ))}
        </div>
        {/* Recipe card for the selected section */}
        <div style={{
          background: "#F5E8C7",
          borderRadius: "1rem",
          boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
          padding: "2.5rem 2rem",
          color: "#3C2F2F",
          maxWidth: 600,
          margin: "0 auto",
        }}>
          <h2 style={{ fontWeight: "bold", fontSize: "1.4rem", marginBottom: 8 }}>
            {cards.find((c) => c.key === activeCard)?.label}
          </h2>
          <hr style={{ border: "none", borderTop: "1px solid #C71585", margin: "0.5rem 0 1.5rem 0" }} />
          {cards.find((c) => c.key === activeCard)?.body}
        </div>
      </main>
    </div>
  );
}