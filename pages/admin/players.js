import { useState, useEffect } from "react";

export default function PlayersAdmin() {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/players")
      .then((r) => r.json())
      .then(data => setPlayers(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load players"))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddPlayer(e) {
    e.preventDefault();
    setLoading(true);
    fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((newPlayer) => setPlayers((p) => Array.isArray(p) ? [...p, newPlayer] : [newPlayer]))
      .catch(() => setError("Failed to add player"))
      .finally(() => setLoading(false));
    setForm({ first_name: "", last_name: "", email: "" });
    setShowForm(false);
  }

  return (
    <div>
      <h2>Player Management</h2>
      {error && <div style={{ color: "#C71585" }}>{error}</div>}
      {loading && <div>Loading...</div>}
      <button onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Close" : "Add New Player"}
      </button>
      {showForm && (
        <form onSubmit={handleAddPlayer} style={{ marginTop: 16, marginBottom: 16 }}>
          <input
            name="first_name"
            placeholder="First Name"
            value={form.first_name}
            onChange={handleChange}
            required
          />
          <input
            name="last_name"
            placeholder="Last Name"
            value={form.last_name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
          />
          <button type="submit" disabled={loading}>Add Player</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(players) && players.map((p) => (
            <tr key={p.id || p.email}>
              <td>{p.first_name}</td>
              <td>{p.last_name}</td>
              <td>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}