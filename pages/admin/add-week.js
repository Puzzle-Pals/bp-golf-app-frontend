import { useState, useEffect } from "react";

export default function AddWeekAdmin() {
  const [players, setPlayers] = useState([]);
  const [form, setForm] = useState({
    player_id: "",
    score: "",
    week: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then((r) => r.json())
      .then(setPlayers);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/api/weekly-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((r) => r.json())
      .then(() => setMessage("Weekly results saved!"));
    setForm({ player_id: "", score: "", week: "" });
  }

  return (
    <div>
      <h2>Add Weekly Results</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
        <select
          name="player_id"
          value={form.player_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Player</option>
          {players.map((p) => (
            <option key={p.id} value={p.id}>
              {p.first_name} {p.last_name}
            </option>
          ))}
        </select>
        <input
          name="score"
          placeholder="Score"
          value={form.score}
          onChange={handleChange}
          required
          type="number"
        />
        <input
          name="week"
          placeholder="Week"
          value={form.week}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Result</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}