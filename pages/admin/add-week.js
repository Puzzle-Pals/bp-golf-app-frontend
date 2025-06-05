import { useState, useEffect } from "react";
import WeeklyResultsForm from '../../components/admin/WeeklyResultsForm';

export default function AddWeekAdmin() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/players")
      .then((r) => r.json())
      .then(setPlayers);
  }, []);

  const handleSubmit = (data) => {
    fetch("/api/weekly-results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(() => setMessage("Weekly results saved!"));
  };

  return (
    <div>
      <h2>Add Weekly Results</h2>
      <WeeklyResultsForm players={players} onSubmit={handleSubmit} />
      {message && <div>{message}</div>}
    </div>
  );
}