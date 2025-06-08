import { useState } from "react";
import Link from "next/link";

// ---- Player Section ----
function PlayersCard({ players, setPlayers }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [editIdx, setEditIdx] = useState(-1);

  function handleSave(e) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setError("");
    if (editIdx >= 0) {
      const arr = [...players];
      arr[editIdx] = { firstName, lastName, email, id: arr[editIdx].id || Date.now() };
      setPlayers(arr.sort((a, b) => a.firstName.localeCompare(b.firstName)));
      setEditIdx(-1);
    } else {
      setPlayers([...players, { firstName, lastName, email, id: Date.now() }]
        .sort((a, b) => a.firstName.localeCompare(b.firstName)));
    }
    setFirstName(""); setLastName(""); setEmail("");
  }
  function handleEdit(idx) {
    setFirstName(players[idx].firstName);
    setLastName(players[idx].lastName);
    setEmail(players[idx].email);
    setEditIdx(idx);
  }
  function handleDelete(idx) {
    setPlayers(players.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(-1);
  }
  return (
    <div>
      <h3 style={styles.cardTitle}>Manage Players</h3>
      <form onSubmit={handleSave} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="First Name"
            style={styles.input}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            style={styles.input}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setFirstName(""); setLastName(""); setEmail(""); }} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
        {error && <div style={{ color: "#D8000C", marginTop: 8 }}>{error}</div>}
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Players List</h4>
        {players.length === 0 && <div style={{ color: "#9CA7A0" }}>No players yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {players.map((p, i) => (
            <li key={p.id || (p.firstName + p.lastName + p.email)} style={styles.listRow}>
              <span>
                <Link
                  href={`/players/${p.id || encodeURIComponent((p.firstName + '-' + p.lastName).toLowerCase())}`}
                  style={{ color: "#1B4D3E", textDecoration: "underline", fontWeight: 500 }}
                >
                  {p.firstName} {p.lastName}
                </Link>
                <span style={{ color: "#A0A0A0" }}> ({p.email})</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---- Events Section ----
function EventsCard({ events, setEvents }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [details, setDetails] = useState("");
  const [editIdx, setEditIdx] = useState(-1);

  function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) return;
    if (editIdx >= 0) {
      const arr = [...events];
      arr[editIdx] = { name, date, details };
      setEvents(arr);
      setEditIdx(-1);
    } else {
      setEvents([...events, { name, date, details }]);
    }
    setName(""); setDate(""); setDetails("");
  }
  function handleEdit(idx) {
    setName(events[idx].name);
    setDate(events[idx].date);
    setDetails(events[idx].details);
    setEditIdx(idx);
  }
  function handleDelete(idx) {
    setEvents(events.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(-1);
  }
  return (
    <div>
      <h3 style={styles.cardTitle}>Manage Events</h3>
      <form onSubmit={handleSave} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Event Name"
            style={styles.input}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="date"
            style={styles.input}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Event Details"
          style={{ ...styles.input, resize: "vertical", minHeight: 38 }}
          value={details}
          onChange={e => setDetails(e.target.value)}
        />
        <div>
          <button type="submit" style={styles.button}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setName(""); setDate(""); setDetails(""); }} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Events List</h4>
        {events.length === 0 && <div style={{ color: "#9CA7A0" }}>No events yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {events.map((ev, i) => (
            <li key={ev.name + ev.date} style={styles.listRow}>
              <span>
                <b>{ev.name}</b> <span style={{ color: "#A0A0A0" }}>({ev.date})</span>
                <br />
                <span style={{ color: "#30635E", fontSize: 14 }}>{ev.details}</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---- Weekly Results Section ----
function WeeklyResultsCard({ players, weeklyResults, setWeeklyResults }) {
  const [weekNum, setWeekNum] = useState("");
  const [wins, setWins] = useState("");
  const [second, setSecond] = useState("");
  const [highScore, setHighScore] = useState("");
  const [deuce, setDeuce] = useState("");
  const [ctp, setCtp] = useState("");
  const [editIdx, setEditIdx] = useState(-1);

  function handleSave(e) {
    e.preventDefault();
    if (!weekNum) return;
    const entry = { weekNum, wins, second, highScore, deuce, ctp };
    if (editIdx >= 0) {
      const arr = [...weeklyResults];
      arr[editIdx] = entry;
      setWeeklyResults(arr);
      setEditIdx(-1);
    } else {
      setWeeklyResults([...weeklyResults, entry]);
    }
    setWeekNum(""); setWins(""); setSecond(""); setHighScore(""); setDeuce(""); setCtp("");
  }
  function handleEdit(idx) {
    const w = weeklyResults[idx];
    setWeekNum(w.weekNum);
    setWins(w.wins);
    setSecond(w.second);
    setHighScore(w.highScore);
    setDeuce(w.deuce);
    setCtp(w.ctp);
    setEditIdx(idx);
  }
  function handleDelete(idx) {
    setWeeklyResults(weeklyResults.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(-1);
  }
  return (
    <div>
      <h3 style={styles.cardTitle}>Weekly Results</h3>
      <form onSubmit={handleSave} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <input
            type="number"
            placeholder="Week #"
            style={styles.input}
            value={weekNum}
            onChange={e => setWeekNum(e.target.value)}
            required
            min={1}
          />
          <select style={styles.input} value={wins} onChange={e => setWins(e.target.value)} required>
            <option value="">Winner</option>
            {players.map(p => (
              <option key={"w" + (p.id || p.firstName + p.lastName)} value={p.id || `${p.firstName} ${p.lastName}`}>
                <Link href={`/players/${p.id || encodeURIComponent((p.firstName + '-' + p.lastName).toLowerCase())}`}>
                  {p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.name}
                </Link>
              </option>
            ))}
          </select>
          <select style={styles.input} value={second} onChange={e => setSecond(e.target.value)}>
            <option value="">2nd Place</option>
            {players.map(p => (
              <option key={"2" + (p.id || p.firstName + p.lastName)} value={p.id || `${p.firstName} ${p.lastName}`}>
                <Link href={`/players/${p.id || encodeURIComponent((p.firstName + '-' + p.lastName).toLowerCase())}`}>
                  {p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.name}
                </Link>
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formRow}>
          <select style={styles.input} value={highScore} onChange={e => setHighScore(e.target.value)}>
            <option value="">Highest Score</option>
            {players.map(p => (
              <option key={"h" + (p.id || p.firstName + p.lastName)} value={p.id || `${p.firstName} ${p.lastName}`}>
                <Link href={`/players/${p.id || encodeURIComponent((p.firstName + '-' + p.lastName).toLowerCase())}`}>
                  {p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.name}
                </Link>
              </option>
            ))}
          </select>
          <select style={styles.input} value={deuce} onChange={e => setDeuce(e.target.value)}>
            <option value="">Deuce Pot Wins</option>
            {players.map(p => (
              <option key={"d" + (p.id || p.firstName + p.lastName)} value={p.id || `${p.firstName} ${p.lastName}`}>
                <Link href={`/players/${p.id || encodeURIComponent((p.firstName + '-' + p.lastName).toLowerCase())}`}>
                  {p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.name}
                </Link>
              </option>
            ))}
          </select>
          <select style={styles.input} value={ctp} onChange={e => setCtp(e.target.value)}>
            <option value="">Closest to Pin</option>
            {players.map(p => (
              <option key={"c" + (p.id || p.firstName + p.lastName)} value={p.id || `${p.firstName} ${p.lastName}`}>
                <Link href={`/players/${p.id || encodeURIComponent((p.firstName + '-' + p.lastName).toLowerCase())}`}>
                  {p.firstName && p.lastName ? `${p.firstName} ${p.lastName}` : p.name}
                </Link>
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" style={styles.button}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => {
              setEditIdx(-1); setWeekNum(""); setWins(""); setSecond(""); setHighScore(""); setDeuce(""); setCtp("");
            }} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Weekly Results List</h4>
        {weeklyResults.length === 0 && <div style={{ color: "#9CA7A0" }}>No results yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {weeklyResults
            .slice()
            .sort((a, b) => Number(a.weekNum) - Number(b.weekNum))
            .map((w, i) => (
            <li key={w.weekNum + w.wins} style={styles.listRow}>
              <span>
                <b>Week {w.weekNum}</b>: 
                <span style={{ marginLeft: 10 }}>
                  Winner: {w.wins || "-"}, 2nd: {w.second || "-"}, High Score: {w.highScore || "-"}, Deuce: {w.deuce || "-"}, CTP: {w.ctp || "-"}
                </span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---- News Section ----
function NewsCard({ news, setNews }) {
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [editIdx, setEditIdx] = useState(-1);

  function handleSave(e) {
    e.preventDefault();
    if (!headline.trim()) return;
    if (editIdx >= 0) {
      const arr = [...news];
      arr[editIdx] = { headline, body };
      setNews(arr);
      setEditIdx(-1);
    } else {
      setNews([...news, { headline, body }]);
    }
    setHeadline(""); setBody("");
  }
  function handleEdit(idx) {
    setHeadline(news[idx].headline);
    setBody(news[idx].body);
    setEditIdx(idx);
  }
  function handleDelete(idx) {
    setNews(news.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(-1);
  }
  return (
    <div>
      <h3 style={styles.cardTitle}>Post League News</h3>
      <form onSubmit={handleSave} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Headline"
            style={styles.input}
            value={headline}
            onChange={e => setHeadline(e.target.value)}
            required
          />
        </div>
        <textarea
          placeholder="News details"
          style={{ ...styles.input, resize: "vertical", minHeight: 38 }}
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <div>
          <button type="submit" style={styles.button}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setHeadline(""); setBody(""); }} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>News List</h4>
        {news.length === 0 && <div style={{ color: "#9CA7A0" }}>No news yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {news.map((item, i) => (
            <li key={item.headline + i} style={styles.listRow}>
              <span>
                <b>{item.headline}</b><br />
                <span style={{ fontSize: 14 }}>{item.body}</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---- Messaging Section ----
function MessagingCard({ messages, setMessages }) {
  const [msg, setMsg] = useState("");
  function handleSend(e) {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages([...messages, { msg, date: new Date().toLocaleString() }]);
    setMsg("");
  }
  return (
    <div>
      <h3 style={styles.cardTitle}>Send Announcement</h3>
      <form onSubmit={handleSend} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <textarea
            placeholder="Type your message..."
            style={{ ...styles.input, resize: "vertical", minHeight: 38 }}
            value={msg}
            onChange={e => setMsg(e.target.value)}
          />
          <button type="submit" style={styles.button}>Send</button>
        </div>
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Sent Announcements</h4>
        {messages.length === 0 && <div style={{ color: "#9CA7A0" }}>No messages yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {messages.map((item, i) => (
            <li key={item.msg + item.date} style={styles.listRow}>
              <span>
                <b>{item.msg}</b> <span style={{ color: "#B0B0B0", fontSize: 13 }}>({item.date})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---- Main Admin Dashboard ----
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Players");
  const [players, setPlayers] = useState([]);
  const [events, setEvents] = useState([]);
  const [weeklyResults, setWeeklyResults] = useState([]);
  const [news, setNews] = useState([]);
  const [messages, setMessages] = useState([]);

  const tabs = [
    { key: "Players", label: "Players", body: <PlayersCard players={players} setPlayers={setPlayers} /> },
    { key: "Events", label: "Events", body: <EventsCard events={events} setEvents={setEvents} /> },
    { key: "WeeklyResults", label: "Weekly Results", body: <WeeklyResultsCard players={players} weeklyResults={weeklyResults} setWeeklyResults={setWeeklyResults} /> },
    { key: "News", label: "News", body: <NewsCard news={news} setNews={setNews} /> },
    { key: "Messaging", label: "Messaging", body: <MessagingCard messages={messages} setMessages={setMessages} /> },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(120deg,#E5F3EF 0%,#CCE8E1 100%)" }}>
      {/* Top nav */}
      <nav style={{ backgroundColor: "#20504F", padding: "1rem 0", boxShadow: "0 2px 8px rgba(32,80,79,0.07)" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ color: "#F5E8C7", fontSize: "1.5rem", fontWeight: "bold", letterSpacing: 0.5 }}>
            BP Men’s League (Admin)
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" style={{ color: "#F5E8C7", textDecoration: "none" }}>Home</Link>
            <a href="/leaderboard" target="_blank" rel="noopener noreferrer" style={{ color: "#F5E8C7", textDecoration: "none" }}>Leaderboard</a>
            <a href="/player-stats" target="_blank" rel="noopener noreferrer" style={{ color: "#F5E8C7", textDecoration: "none" }}>Player Stats</a>
            <a href="/weekly-results" target="_blank" rel="noopener noreferrer" style={{ color: "#F5E8C7", textDecoration: "none" }}>Weekly Results</a>
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
                borderRadius: "12px 12px 0 0"
              }}>
              {tab.label}
            </button>
          ))}
        </div>
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

// ---- Styles ----
const styles = {
  cardTitle: { fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" },
  formRow: { display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" },
  input: {
    flex: "1 1 100px",
    fontSize: 16,
    padding: 10,
    borderRadius: 7,
    border: "1px solid #DDE5E0",
    background: "#F8FAF9",
    color: "#102A23",
    boxShadow: "0 1px 1.5px #e0e0e0",
    marginBottom: 0,
  },
  button: {
    background: "linear-gradient(90deg,#29947B,#155853)",
    color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
    padding: "10px 32px", fontSize: 16, cursor: "pointer", marginRight: 8, boxShadow: "0 1px 5px #dbece6"
  },
  cancelButton: {
    background: "#fff", color: "#20504F", border: "1px solid #DDE5E0", borderRadius: 6, fontWeight: 500,
    padding: "10px 20px", fontSize: 16, cursor: "pointer", marginLeft: 8
  },
  listRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "8px 0", borderBottom: "1px solid #F2F5F4"
  },
  smallBtn: {
    background: "#E5F3EF", color: "#20504F", border: "1px solid #DDE5E0", borderRadius: 5, fontWeight: 500,
    padding: "4px 14px", fontSize: 14, cursor: "pointer", marginRight: 8
  },
  smallBtnDelete: {
    background: "#F9E8E8", color: "#B90000", border: "1px solid #E2BDBD", borderRadius: 5, fontWeight: 500,
    padding: "4px 14px", fontSize: 14, cursor: "pointer"
  }
};