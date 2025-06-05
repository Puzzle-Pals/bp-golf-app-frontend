import { useState } from "react";

export default function WeeklyResultsForm({ players, onSubmit }) {
  const [winners, setWinners] = useState([null, null]);
  const [second, setSecond] = useState([null, null]);
  const [highScore, setHighScore] = useState([null, null]);
  const [deuce, setDeuce] = useState([null, null]);
  const [ctp, setCtp] = useState([null]);
  const [error, setError] = useState("");

  const playerOptions = [
    <option key="">Select...</option>,
    ...players.map(p => (
      <option key={p.id} value={p.id}>
        {p.first_name} {p.last_name}
      </option>
    )),
  ];

  const validate = () => {
    // Example: require at least one winner, etc. Adjust as needed.
    if (!winners[0] && !winners[1]) return "At least one winner required.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    onSubmit({
      winners,
      second,
      high_score: highScore,
      deuce,
      ctp
    });
    setWinners([null, null]);
    setSecond([null, null]);
    setHighScore([null, null]);
    setDeuce([null, null]);
    setCtp([null]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ color: "#F5E8C7" }}>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: 12 }}>
          Winners:
          <select value={winners[0] || ""} onChange={e => setWinners([e.target.value, winners[1]])} style={{ marginLeft: 8, marginRight: 8 }}>{playerOptions}</select>
          <select value={winners[1] || ""} onChange={e => setWinners([winners[0], e.target.value])}>{playerOptions}</select>
        </li>
        <li style={{ marginBottom: 12 }}>
          2nd Place:
          <select value={second[0] || ""} onChange={e => setSecond([e.target.value, second[1]])} style={{ marginLeft: 8, marginRight: 8 }}>{playerOptions}</select>
          <select value={second[1] || ""} onChange={e => setSecond([second[0], e.target.value])}>{playerOptions}</select>
        </li>
        <li style={{ marginBottom: 12 }}>
          Highest Score:
          <select value={highScore[0] || ""} onChange={e => setHighScore([e.target.value, highScore[1]])} style={{ marginLeft: 8, marginRight: 8 }}>{playerOptions}</select>
          <select value={highScore[1] || ""} onChange={e => setHighScore([highScore[0], e.target.value])}>{playerOptions}</select>
        </li>
        <li style={{ marginBottom: 12 }}>
          Deuce Pot:
          <select value={deuce[0] || ""} onChange={e => setDeuce([e.target.value, deuce[1]])} style={{ marginLeft: 8, marginRight: 8 }}>{playerOptions}</select>
          <select value={deuce[1] || ""} onChange={e => setDeuce([deuce[0], e.target.value])}>{playerOptions}</select>
        </li>
        <li style={{ marginBottom: 12 }}>
          Closest to Pin:
          <select value={ctp[0] || ""} onChange={e => setCtp([e.target.value])} style={{ marginLeft: 8 }}>{playerOptions}</select>
        </li>
      </ul>
      <button type="submit">Save Weekly Results</button>
    </form>
  );
}