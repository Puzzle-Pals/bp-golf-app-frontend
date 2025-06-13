import { useState, useEffect } from "react";
import Link from "next/link";
import {
  adminGetPlayers,
  adminAddPlayer,
  adminUpdatePlayer,
  adminDeletePlayer,
  adminGetEvents,
  adminAddEvent,
  adminUpdateEvent,
  adminDeleteEvent,
  adminGetWeeklyResults,
  adminAddWeeklyResult,
  adminUpdateWeeklyResult,
  adminDeleteWeeklyResult,
  adminGetNews,
  adminAddNews,
  adminUpdateNews,
  adminDeleteNews,
  sendAdminMessage,
} from "../../utils/api";

// ---- Player Section ----
function PlayersCard({ players, setPlayers }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [editIdx, setEditIdx] = useState(-1);
  const [loading, setLoading] = useState(false);

  async function refreshPlayers() {
    try {
      const data = await adminGetPlayers();
      setPlayers(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refreshPlayers();
    // eslint-disable-next-line
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (editIdx >= 0) {
        const updated = { ...players[editIdx], first_name: firstName, last_name: lastName, email };
        await adminUpdatePlayer({
          id: updated.id,
          first_name: updated.first_name,
          last_name: updated.last_name,
          email: updated.email,
        });
      } else {
        await adminAddPlayer({
          first_name: firstName,
          last_name: lastName,
          email,
        });
      }
      await refreshPlayers();
      setEditIdx(-1);
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  function handleEdit(idx) {
    setFirstName(players[idx].first_name || players[idx].firstName);
    setLastName(players[idx].last_name || players[idx].lastName);
    setEmail(players[idx].email);
    setEditIdx(idx);
  }
  async function handleDelete(idx) {
    setError("");
    setLoading(true);
    try {
      await adminDeletePlayer(players[idx].id);
      await refreshPlayers();
      if (editIdx === idx) setEditIdx(-1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
          <button type="submit" style={styles.button} disabled={loading}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setFirstName(""); setLastName(""); setEmail(""); }} style={styles.cancelButton} disabled={loading}>
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
            <li key={p.id || (p.first_name + p.last_name + p.email)} style={styles.listRow}>
              <span>
                <Link
                  href={`/players/${p.id || encodeURIComponent((p.first_name + '-' + p.last_name).toLowerCase())}`}
                  style={{ color: "#1B4D3E", textDecoration: "underline", fontWeight: 500 }}
                >
                  {p.first_name} {p.last_name}
                </Link>
                <span style={{ color: "#A0A0A0" }}> ({p.email})</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn} disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete} disabled={loading}>Delete</button>
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refreshEvents() {
    try {
      const data = await adminGetEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refreshEvents();
    // eslint-disable-next-line
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Event name is required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (editIdx >= 0) {
        const updated = { ...events[editIdx], name, date, details };
        await adminUpdateEvent({
          id: updated.id,
          title: updated.name,
          event_date: updated.date,
          description: updated.details,
        });
      } else {
        await adminAddEvent({
          title: name,
          event_date: date,
          description: details,
        });
      }
      await refreshEvents();
      setEditIdx(-1);
      setName("");
      setDate("");
      setDetails("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  function handleEdit(idx) {
    setName(events[idx].title || events[idx].name);
    setDate(events[idx].event_date || events[idx].date);
    setDetails(events[idx].description || events[idx].details);
    setEditIdx(idx);
  }
  async function handleDelete(idx) {
    setError("");
    setLoading(true);
    try {
      await adminDeleteEvent(events[idx].id);
      await refreshEvents();
      if (editIdx === idx) setEditIdx(-1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
          <button type="submit" style={styles.button} disabled={loading}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setName(""); setDate(""); setDetails(""); }} style={styles.cancelButton} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
        {error && <div style={{ color: "#D8000C", marginTop: 8 }}>{error}</div>}
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Events List</h4>
        {events.length === 0 && <div style={{ color: "#9CA7A0" }}>No events yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {events.map((ev, i) => (
            <li key={ev.id || ev.name + ev.date} style={styles.listRow}>
              <span>
                <b>{ev.title || ev.name}</b> <span style={{ color: "#A0A0A0" }}>({ev.event_date || ev.date})</span>
                <br />
                <span style={{ color: "#30635E", fontSize: 14 }}>{ev.description || ev.details}</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn} disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete} disabled={loading}>Delete</button>
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refreshWeeklyResults() {
    try {
      const data = await adminGetWeeklyResults();
      setWeeklyResults(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refreshWeeklyResults();
    // eslint-disable-next-line
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!weekNum) {
      setError("Week number is required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const entry = {
        weekNum,
        wins,
        second,
        highScore,
        deuce,
        ctp,
      };
      if (editIdx >= 0) {
        await adminUpdateWeeklyResult({ ...weeklyResults[editIdx], ...entry });
      } else {
        await adminAddWeeklyResult(entry);
      }
      await refreshWeeklyResults();
      setEditIdx(-1);
      setWeekNum(""); setWins(""); setSecond(""); setHighScore(""); setDeuce(""); setCtp("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  function handleEdit(idx) {
    const w = weeklyResults[idx];
    setWeekNum(w.weekNum || w.week_number);
    setWins(w.wins);
    setSecond(w.second);
    setHighScore(w.highScore);
    setDeuce(w.deuce);
    setCtp(w.ctp);
    setEditIdx(idx);
  }
  async function handleDelete(idx) {
    setError("");
    setLoading(true);
    try {
      await adminDeleteWeeklyResult(weeklyResults[idx].id);
      await refreshWeeklyResults();
      if (editIdx === idx) setEditIdx(-1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
          <select style={styles.input} value={second} onChange={e => setSecond(e.target.value)}>
            <option value="">2nd Place</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.formRow}>
          <select style={styles.input} value={highScore} onChange={e => setHighScore(e.target.value)}>
            <option value="">Highest Score</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
          <select style={styles.input} value={deuce} onChange={e => setDeuce(e.target.value)}>
            <option value="">Deuce Pot Wins</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
          <select style={styles.input} value={ctp} onChange={e => setCtp(e.target.value)}>
            <option value="">Closest to Pin</option>
            {players.map(p => (
              <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" style={styles.button} disabled={loading}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => {
              setEditIdx(-1); setWeekNum(""); setWins(""); setSecond(""); setHighScore(""); setDeuce(""); setCtp("");
            }} style={styles.cancelButton} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
        {error && <div style={{ color: "#D8000C", marginTop: 8 }}>{error}</div>}
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Weekly Results List</h4>
        {weeklyResults.length === 0 && <div style={{ color: "#9CA7A0" }}>No results yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {weeklyResults
            .slice()
            .sort((a, b) => Number(a.weekNum || a.week_number) - Number(b.weekNum || b.week_number))
            .map((w, i) => (
            <li key={w.id || w.weekNum + w.wins} style={styles.listRow}>
              <span>
                <b>Week {w.weekNum || w.week_number}</b>: 
                <span style={{ marginLeft: 10 }}>
                  Winner: {w.wins || "-"}, 2nd: {w.second || "-"}, High Score: {w.highScore || "-"}, Deuce: {w.deuce || "-"}, CTP: {w.ctp || "-"}
                </span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn} disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete} disabled={loading}>Delete</button>
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function refreshNews() {
    try {
      const data = await adminGetNews();
      setNews(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    refreshNews();
    // eslint-disable-next-line
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!headline.trim()) {
      setError("Headline is required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      if (editIdx >= 0) {
        const updated = { ...news[editIdx], title: headline, details: body };
        await adminUpdateNews({ id: updated.id, title: updated.title, details: updated.details });
      } else {
        await adminAddNews({ title: headline, details: body });
      }
      await refreshNews();
      setEditIdx(-1);
      setHeadline(""); setBody("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  function handleEdit(idx) {
    setHeadline(news[idx].title || news[idx].headline);
    setBody(news[idx].details || news[idx].body);
    setEditIdx(idx);
  }
  async function handleDelete(idx) {
    setError("");
    setLoading(true);
    try {
      await adminDeleteNews(news[idx].id);
      await refreshNews();
      if (editIdx === idx) setEditIdx(-1);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
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
          <button type="submit" style={styles.button} disabled={loading}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setHeadline(""); setBody(""); }} style={styles.cancelButton} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
        {error && <div style={{ color: "#D8000C", marginTop: 8 }}>{error}</div>}
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>News List</h4>
        {news.length === 0 && <div style={{ color: "#9CA7A0" }}>No news yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {news.map((item, i) => (
            <li key={item.id || item.headline + i} style={styles.listRow}>
              <span>
                <b>{item.title || item.headline}</b><br />
                <span style={{ fontSize: 14 }}>{item.details || item.body}</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn} disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete} disabled={loading}>Delete</button>
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
  const [subject, setSubject] = useState("");
  const [emailList, setEmailList] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!msg.trim() || !subject.trim() || !emailList.trim()) {
      setError("Subject, recipients, and message are required.");
      return;
    }
    setLoading(true);
    try {
      await sendAdminMessage({
        subject,
        message: msg,
        recipientEmails: emailList.split(",").map(e => e.trim()),
      });
      setSuccess("Message sent!");
      setMessages([...messages, { msg, date: new Date().toLocaleString() }]);
      setMsg("");
      setSubject("");
      setEmailList("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  return (
    <div>
      <h3 style={styles.cardTitle}>Send Announcement</h3>
      <form onSubmit={handleSend} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <input
            placeholder="Subject"
            style={styles.input}
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
          />
          <input
            placeholder="Recipient Emails (comma separated)"
            style={styles.input}
            value={emailList}
            onChange={e => setEmailList(e.target.value)}
            required
          />
        </div>
        <div style={styles.formRow}>
          <textarea
            placeholder="Type your message..."
            style={{ ...styles.input, resize: "vertical", minHeight: 38 }}
            value={msg}
            onChange={e => setMsg(e.target.value)}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>Send</button>
        </div>
        {error && <div style={{ color: "#D8000C", marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: "#29947B", marginTop: 8 }}>{success}</div>}
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

  // Logout handler
  function handleLogout() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("bp_admin_token");
      window.location.href = "/admin";
    }
  }

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
            <a href="/news" target="_blank" rel="noopener noreferrer" style={{ color: "#F5E8C7", textDecoration: "none" }}>News</a>
            <Link href="/admin" style={{
              color: "#F5E8C7", textDecoration: "none", fontWeight: "bold", borderBottom: "2px solid #DDE5E0"
            }}>Admin</Link>
            <button
              style={{
                background: "#C71585",
                color: "#F5E8C7",
                border: "none",
                borderRadius: "4px",
                padding: "0.5rem 1.1rem",
                fontWeight: "bold",
                fontSize: "1rem",
                cursor: "pointer"
              }}
              onClick={handleLogout}
            >
              Logout
            </button>
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