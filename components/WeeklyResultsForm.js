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

  const handleSubmit = e => {
    e.preventDefault();
    // Add validation if needed
    onSubmit({ winners, second, highScore, deuce, ctp });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        Winners:
        <select onChange={e => setWinners([e.target.value, winners[1]])}>{playerOptions}</select>
        <select onChange={e => setWinners([winners[0], e.target.value])}>{playerOptions}</select>
      </div>
      <div>
        2nd Place:
        <select onChange={e => setSecond([e.target.value, second[1]])}>{playerOptions}</select>
        <select onChange={e => setSecond([second[0], e.target.value])}>{playerOptions}</select>
      </div>
      <div>
        Highest Score:
        <select onChange={e => setHighScore([e.target.value, highScore[1]])}>{playerOptions}</select>
        <select onChange={e => setHighScore([highScore[0], e.target.value])}>{playerOptions}</select>
      </div>
      <div>
        Deuce Pot:
        <select onChange={e => setDeuce([e.target.value, deuce[1]])}>{playerOptions}</select>
        <select onChange={e => setDeuce([deuce[0], e.target.value])}>{playerOptions}</select>
      </div>
      <div>
        Closest to Pin:
        <select onChange={e => setCtp([e.target.value])}>{playerOptions}</select>
      </div>
      <button type="submit">Save Weekly Results</button>
    </form>
  );
}