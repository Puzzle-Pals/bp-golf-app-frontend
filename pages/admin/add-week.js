import { useState, useEffect } from "react";

export default function AddWeekAdmin() {
  const [players, setPlayers] = useState([]);
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
      .then(setPlayers);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Prepare winners/places arrays
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
      .then(() => setMessage("Weekly results saved!"));
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

  // Helper for player dropdowns
  function renderPlayerOptions() {
    return [
      <option value="" key="empty">Select Player</option>,
      ...players.map((p) => (
        <option key={p.id} value={p.id}>
          {p.first_name} {p.last_name}
        </option>
      ))
    ];
  }

  return (
    <div>
      <h2>Add Weekly Results</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
        <input
          name="week"
          placeholder="Week"
          value={form.week}
          onChange={handleChange}
          required
        />

        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label>Winners:</label>
          <select
            name="winner1"
            value={form.winner1}
            onChange={handleChange}
            required
          >
            {renderPlayerOptions()}
          </select>
          <select
            name="winner2"
            value={form.winner2}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
          <input
            name="winnerScore"
            placeholder="Winner Score"
            value={form.winnerScore}
            onChange={handleChange}
            type="number"
            step="0.1"
          />
        </div>

        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label>2nd Place:</label>
          <select
            name="secondPlace1"
            value={form.secondPlace1}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
          <select
            name="secondPlace2"
            value={form.secondPlace2}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
          <input
            name="secondPlaceScore"
            placeholder="2nd Place Score"
            value={form.secondPlaceScore}
            onChange={handleChange}
            type="number"
            step="0.1"
          />
        </div>

        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label>Highest Score:</label>
          <select
            name="thirdPlace1"
            value={form.thirdPlace1}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
          <select
            name="thirdPlace2"
            value={form.thirdPlace2}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
          <input
            name="thirdPlaceScore"
            placeholder="Highest Score"
            value={form.thirdPlaceScore}
            onChange={handleChange}
            type="number"
            step="0.1"
          />
        </div>

        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label>Deuce Pot Winner:</label>
          <select
            name="deucePotWinner"
            value={form.deucePotWinner}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
        </div>

        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <label>Closest to Pin Winner:</label>
          <select
            name="closestToPinWinner"
            value={form.closestToPinWinner}
            onChange={handleChange}
          >
            {renderPlayerOptions()}
          </select>
        </div>

        <button type="submit">Add Result</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}