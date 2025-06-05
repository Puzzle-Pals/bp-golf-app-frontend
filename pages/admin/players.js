import { useState, useEffect } from "react";

export default function PlayersAdmin() {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    fetch("/api/players")
      .then((r) => r.json())
      .then(setPlayers);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleAddPlayer(e) {
    e.preventDefault();
    fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then((newPlayer) => setPlayers((p) => [...p, newPlayer]));
    setForm({ first_name: "", last_name: "", email: "" });
    setShowForm(false);
  }

  return (
    <div>
      <h2>Player Management</h2>
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
          <button type="submit">Add Player</button>
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
          {players.map((p) => (
            <tr key={p.id}>
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