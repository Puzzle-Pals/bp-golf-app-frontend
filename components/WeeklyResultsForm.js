import { useState } from "react";

export default function WeeklyResultsForm({ players, onSubmit }) {
  const [form, setForm] = useState({
    player_id: "",
    score: "",
    week: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({ player_id: "", score: "", week: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
      <select
        name="player_id"
        value={form.player_id}
        onChange={handleChange}
        required
      >
        <option value="">Select Player</option>
        {players && players.map((p) => (
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
  );
}