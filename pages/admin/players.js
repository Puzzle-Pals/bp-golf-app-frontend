import { useState, useEffect } from "react";
import PlayerForm from '../../components/admin/PlayerForm';

export default function PlayersAdmin() {
  const [players, setPlayers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("/api/players")
      .then((r) => r.json())
      .then(setPlayers);
  }, []);

  const handleAddPlayer = (data) => {
    fetch("/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((newPlayer) => setPlayers((p) => [...p, newPlayer]));
    setShowForm(false);
  };

  return (
    <div>
      <h2>Player Management</h2>
      <button onClick={() => setShowForm((prev) => !prev)}>
        {showForm ? "Close" : "Add New Player"}
      </button>
      {showForm && <PlayerForm onSubmit={handleAddPlayer} />}
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