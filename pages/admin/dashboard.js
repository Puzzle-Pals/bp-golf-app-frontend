import { useState, useEffect } from "react";
import Link from "next/link";
import {
  adminGetPlayers, adminAddPlayer, adminUpdatePlayer, adminDeletePlayer,
  adminGetEvents, adminAddEvent, adminUpdateEvent, adminDeleteEvent,
  adminGetWeeklyResults, adminAddWeeklyResult, adminUpdateWeeklyResult, adminDeleteWeeklyResult,
  adminGetNews, adminAddNews, adminUpdateNews, adminDeleteNews,
  sendAdminMessage, adminLogout,
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

  useEffect(() => { refreshPlayers(); }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("All fields are required.");
      return;
    }
    setError(""); setLoading(true);
    try {
      if (editIdx >= 0) {
        await adminUpdatePlayer({
          id: players[editIdx].id,
          first_name: firstName,
          last_name: lastName,
          email,
        });
      } else {
        await adminAddPlayer({ first_name: firstName, last_name: lastName, email });
      }
      await refreshPlayers();
      setEditIdx(-1); setFirstName(""); setLastName(""); setEmail("");
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
    setError(""); setLoading(true);
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
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Manage Players</h3>
      <form onSubmit={handleSave} className="mb-5">
        <div className="flex flex-wrap gap-3 mb-2">
          <input type="text" placeholder="First Name" className="input input-bordered flex-1" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" className="input input-bordered flex-1" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email Address" className="input input-bordered flex-1" value={email} onChange={e => setEmail(e.target.value)} required />
          <button type="submit" className="btn btn-primary" disabled={loading}>{editIdx >= 0 ? "Update" : "Add"}</button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setFirstName(""); setLastName(""); setEmail(""); }} className="btn btn-secondary" disabled={loading}>Cancel</button>
          )}
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div>
        <h4 className="mb-2 text-lg text-gray-700 font-medium">Players List</h4>
        {players.length === 0 && <div className="text-gray-400">No players yet.</div>}
        <ul className="divide-y">
          {players.map((p, i) => (
            <li key={p.id || (p.first_name + p.last_name + p.email)} className="flex items-center justify-between py-2">
              <span>
                <Link href={`/players/${p.id || encodeURIComponent((p.first_name + '-' + p.last_name).toLowerCase())}`} className="text-green-700 underline font-medium">
                  {p.first_name} {p.last_name}
                </Link>
                <span className="text-gray-400"> ({p.email})</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} className="btn btn-sm btn-accent mr-2" disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} className="btn btn-sm btn-error" disabled={loading}>Delete</button>
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

  useEffect(() => { refreshEvents(); }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Event name is required.");
      return;
    }
    setError(""); setLoading(true);
    try {
      if (editIdx >= 0) {
        await adminUpdateEvent({
          id: events[editIdx].id,
          title: name,
          event_date: date,
          description: details,
        });
      } else {
        await adminAddEvent({ title: name, event_date: date, description: details });
      }
      await refreshEvents();
      setEditIdx(-1); setName(""); setDate(""); setDetails("");
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
    setError(""); setLoading(true);
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
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Manage Events</h3>
      <form onSubmit={handleSave} className="mb-5">
        <div className="flex flex-wrap gap-3 mb-2">
          <input type="text" placeholder="Event Name" className="input input-bordered flex-1" value={name} onChange={e => setName(e.target.value)} required />
          <input type="date" className="input input-bordered flex-1" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <textarea placeholder="Event Details" className="textarea textarea-bordered w-full mb-3" value={details} onChange={e => setDetails(e.target.value)} />
        <div>
          <button type="submit" className="btn btn-primary mr-2" disabled={loading}>{editIdx >= 0 ? "Update" : "Add"}</button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setName(""); setDate(""); setDetails(""); }} className="btn btn-secondary" disabled={loading}>Cancel</button>
          )}
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div>
        <h4 className="mb-2 text-lg text-gray-700 font-medium">Events List</h4>
        {events.length === 0 && <div className="text-gray-400">No events yet.</div>}
        <ul className="divide-y">
          {events.map((ev, i) => (
            <li key={ev.id || ev.name + ev.date} className="flex items-center justify-between py-2">
              <span>
                <b>{ev.title || ev.name}</b> <span className="text-gray-400">({ev.event_date || ev.date})</span>
                <br />
                <span className="text-green-700 text-sm">{ev.description || ev.details}</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} className="btn btn-sm btn-accent mr-2" disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} className="btn btn-sm btn-error" disabled={loading}>Delete</button>
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

  useEffect(() => { refreshWeeklyResults(); }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!weekNum) {
      setError("Week number is required.");
      return;
    }
    setError(""); setLoading(true);
    try {
      const entry = { weekNum, wins, second, highScore, deuce, ctp };
      if (editIdx >= 0) {
        await adminUpdateWeeklyResult({ ...weeklyResults[editIdx], ...entry });
      } else {
        await adminAddWeeklyResult(entry);
      }
      await refreshWeeklyResults();
      setEditIdx(-1); setWeekNum(""); setWins(""); setSecond(""); setHighScore(""); setDeuce(""); setCtp("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  function handleEdit(idx) {
    const w = weeklyResults[idx];
    setWeekNum(w.weekNum || w.week_number); setWins(w.wins); setSecond(w.second);
    setHighScore(w.highScore); setDeuce(w.deuce); setCtp(w.ctp); setEditIdx(idx);
  }
  async function handleDelete(idx) {
    setError(""); setLoading(true);
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
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Weekly Results</h3>
      <form onSubmit={handleSave} className="mb-5">
        <div className="flex flex-wrap gap-3 mb-2">
          <input type="number" placeholder="Week #" className="input input-bordered flex-1" value={weekNum} onChange={e => setWeekNum(e.target.value)} required min={1} />
          <select className="input input-bordered flex-1" value={wins} onChange={e => setWins(e.target.value)} required>
            <option value="">Winner</option>
            {players.map(p => (<option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>))}
          </select>
          <select className="input input-bordered flex-1" value={second} onChange={e => setSecond(e.target.value)}>
            <option value="">2nd Place</option>
            {players.map(p => (<option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>))}
          </select>
        </div>
        <div className="flex flex-wrap gap-3 mb-2">
          <select className="input input-bordered flex-1" value={highScore} onChange={e => setHighScore(e.target.value)}>
            <option value="">Highest Score</option>
            {players.map(p => (<option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>))}
          </select>
          <select className="input input-bordered flex-1" value={deuce} onChange={e => setDeuce(e.target.value)}>
            <option value="">Deuce Pot Wins</option>
            {players.map(p => (<option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>))}
          </select>
          <select className="input input-bordered flex-1" value={ctp} onChange={e => setCtp(e.target.value)}>
            <option value="">Closest to Pin</option>
            {players.map(p => (<option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>))}
          </select>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mr-2" disabled={loading}>{editIdx >= 0 ? "Update" : "Add"}</button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setWeekNum(""); setWins(""); setSecond(""); setHighScore(""); setDeuce(""); setCtp(""); }} className="btn btn-secondary" disabled={loading}>Cancel</button>
          )}
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div>
        <h4 className="mb-2 text-lg text-gray-700 font-medium">Weekly Results List</h4>
        {weeklyResults.length === 0 && <div className="text-gray-400">No results yet.</div>}
        <ul className="divide-y">
          {weeklyResults.slice().sort((a, b) => Number(a.weekNum || a.week_number) - Number(b.weekNum || b.week_number)).map((w, i) => (
            <li key={w.id || w.weekNum + w.wins} className="flex items-center justify-between py-2">
              <span>
                <b>Week {w.weekNum || w.week_number}</b>:
                <span className="ml-2">
                  Winner: {w.wins || "-"}, 2nd: {w.second || "-"}, High Score: {w.highScore || "-"}, Deuce: {w.deuce || "-"}, CTP: {w.ctp || "-"}
                </span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} className="btn btn-sm btn-accent mr-2" disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} className="btn btn-sm btn-error" disabled={loading}>Delete</button>
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

  useEffect(() => { refreshNews(); }, []);

  async function handleSave(e) {
    e.preventDefault();
    if (!headline.trim()) {
      setError("Headline is required.");
      return;
    }
    setError(""); setLoading(true);
    try {
      if (editIdx >= 0) {
        await adminUpdateNews({ id: news[editIdx].id, title: headline, details: body });
      } else {
        await adminAddNews({ title: headline, details: body });
      }
      await refreshNews();
      setEditIdx(-1); setHeadline(""); setBody("");
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
    setError(""); setLoading(true);
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
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Post League News</h3>
      <form onSubmit={handleSave} className="mb-5">
        <div className="flex flex-wrap gap-3 mb-2">
          <input type="text" placeholder="Headline" className="input input-bordered flex-1" value={headline} onChange={e => setHeadline(e.target.value)} required />
        </div>
        <textarea placeholder="News details" className="textarea textarea-bordered w-full mb-3" value={body} onChange={e => setBody(e.target.value)} />
        <div>
          <button type="submit" className="btn btn-primary mr-2" disabled={loading}>{editIdx >= 0 ? "Update" : "Add"}</button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => { setEditIdx(-1); setHeadline(""); setBody(""); }} className="btn btn-secondary" disabled={loading}>Cancel</button>
          )}
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      <div>
        <h4 className="mb-2 text-lg text-gray-700 font-medium">News List</h4>
        {news.length === 0 && <div className="text-gray-400">No news yet.</div>}
        <ul className="divide-y">
          {news.map((item, i) => (
            <li key={item.id || item.headline + i} className="flex items-center justify-between py-2">
              <span>
                <b>{item.title || item.headline}</b><br />
                <span className="text-sm">{item.details || item.body}</span>
              </span>
              <span>
                <button onClick={() => handleEdit(i)} className="btn btn-sm btn-accent mr-2" disabled={loading}>Edit</button>
                <button onClick={() => handleDelete(i)} className="btn btn-sm btn-error" disabled={loading}>Delete</button>
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
    setError(""); setSuccess("");
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
      setMsg(""); setSubject(""); setEmailList("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Send Announcement</h3>
      <form onSubmit={handleSend} className="mb-5">
        <div className="flex flex-wrap gap-3 mb-2">
          <input placeholder="Subject" className="input input-bordered flex-1" value={subject} onChange={e => setSubject(e.target.value)} required />
          <input placeholder="Recipient Emails (comma separated)" className="input input-bordered flex-1" value={emailList} onChange={e => setEmailList(e.target.value)} required />
        </div>
        <div className="flex flex-wrap gap-3 mb-2">
          <textarea placeholder="Type your message..." className="textarea textarea-bordered flex-1" value={msg} onChange={e => setMsg(e.target.value)} required />
          <button type="submit" className="btn btn-primary" disabled={loading}>Send</button>
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>
      <div>
        <h4 className="mb-2 text-lg text-gray-700 font-medium">Sent Announcements</h4>
        {messages.length === 0 && <div className="text-gray-400">No messages yet.</div>}
        <ul className="divide-y">
          {messages.map((item, i) => (
            <li key={item.msg + item.date} className="py-2">
              <span>
                <b>{item.msg}</b> <span className="text-gray-400 text-xs">({item.date})</span>
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
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api"}/admin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "checkAuth" }),
          credentials: "include",
        }
      );
      if (!res.ok) {
        window.location.href = "/admin";
      } else {
        setChecking(false);
      }
    })();
  }, []);

  async function handleLogout() {
    await adminLogout();
    window.location.href = "/admin";
  }

  if (checking) return null;

  const tabs = [
    { key: "Players", label: "Players", body: <PlayersCard players={players} setPlayers={setPlayers} /> },
    { key: "Events", label: "Events", body: <EventsCard events={events} setEvents={setEvents} /> },
    { key: "WeeklyResults", label: "Weekly Results", body: <WeeklyResultsCard players={players} weeklyResults={weeklyResults} setWeeklyResults={setWeeklyResults} /> },
    { key: "News", label: "News", body: <NewsCard news={news} setNews={setNews} /> },
    { key: "Messaging", label: "Messaging", body: <MessagingCard messages={messages} setMessages={setMessages} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <nav className="bg-green-900 py-4 shadow mb-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="text-yellow-100 text-2xl font-bold mb-2 md:mb-0">BP Men’s League (Admin)</span>
          <div className="flex gap-6">
            <Link href="/" className="text-yellow-100 hover:underline">Home</Link>
            <Link href="/leaderboard" className="text-yellow-100 hover:underline">Leaderboard</Link>
            <Link href="/player-stats" className="text-yellow-100 hover:underline">Player Stats</Link>
            <Link href="/weekly-results" className="text-yellow-100 hover:underline">Weekly Results</Link>
            <Link href="/news" className="text-yellow-100 hover:underline">News</Link>
            <Link href="/admin" className="text-yellow-100 font-bold border-b-2 border-yellow-200">Admin</Link>
            <button
              className="bg-pink-700 text-yellow-100 rounded px-4 py-2 font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10 text-green-900">Admin Dashboard</h1>
        <div className="flex gap-2 mb-10 border-b border-green-200 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 rounded-t-lg text-base font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-green-100 text-green-900 border-b-2 border-green-800"
                  : "bg-transparent text-green-700 hover:bg-green-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <section className="bg-white rounded-2xl shadow-lg p-8 min-h-[300px] mb-20">
          {tabs.find(tab => tab.key === activeTab)?.body}
        </section>
      </main>
    </div>
  );
}