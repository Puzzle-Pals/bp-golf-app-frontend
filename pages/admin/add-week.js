import { useState, useEffect } from "react";
export default function AddWeekAdmin() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    week: "",
    winner1: "",
    winner2: "",
    winnerScore: "",
    secondPlace1: "",
    secondPlace2: "",
    secondPlaceScore: "",
    thirdPlace1: "",
    thirdPlace2: "",
    thirdPlaceScore: "",
    deucePotWinner: "",
    closestToPinWinner: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then((r) => r.json())
      .then(data => setPlayers(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load players"));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const winners = [form.winner1, form.winner2].filter(Boolean);
    const secondPlace = [form.secondPlace1, form.secondPlace2].filter(Boolean);
    const thirdPlace = [form.thirdPlace1, form.thirdPlace2].filter(Boolean);

    const payload = {
      week: form.week,
      winners,
      winnerScore: form.winnerScore,
      secondPlace,
      secondPlaceScore: form.secondPlaceScore,
      thirdPlace,
      thirdPlaceScore: form.thirdPlaceScore,
      deucePotWinner: form.deucePotWinner,
      closestToPinWinner: form.closestToPinWinner,
    };

    fetch("/api/weekly-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then(() => setMessage("Weekly results saved!"))
      .catch(() => setError("Failed to save results"));
    setForm({
      week: "",
      winner1: "",
      winner2: "",
      winnerScore: "",
      secondPlace1: "",
      secondPlace2: "",
      secondPlaceScore: "",
      thirdPlace1: "",
      thirdPlace2: "",
      thirdPlaceScore: "",
      deucePotWinner: "",
      closestToPinWinner: "",
    });
  }

  function renderPlayerOptions() {
    return [
      <option value="" key="empty">Select Player</option>,
      ...(Array.isArray(players) ? players.map((p) => (
        <option key={p.id || p.email} value={p.id}>
          {p.first_name} {p.last_name}
        </option>
      )) : [])
    ];
  }

  return (
    <div>
      <h2>Add Weekly Results</h2>
      {error && <div style={{ color: "#C71585" }}>{error}</div>}
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
        <input name="week" placeholder="Week" value={form.week} onChange={handleChange} required />
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label>Winners:</label>
          <select name="winner1" value={form.winner1} onChange={handleChange} required>{renderPlayerOptions()}</select>
          <select name="winner2" value={form.winner2} onChange={handleChange}>{renderPlayerOptions()}</select>
          <input name="winnerScore" placeholder="Winner Score" value={form.winnerScore} onChange={handleChange} type="number" step="0.1" />
        </div>
        {/* Repeat for other fields as required */}
        <button type="submit">Save Week</button>
      </form>
    </div>
  );
}