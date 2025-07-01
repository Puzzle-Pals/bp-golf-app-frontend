import { useState, useEffect } from "react";
export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(() => setError("Failed to load events"));
  }, []);

  return (
    <div>
      <h2>Event Management</h2>
      {error && <div style={{ color: "#C71585" }}>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(events) && events.map((e) => (
            <tr key={e.id || e.name}>
              <td>{e.name}</td>
              <td>{e.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}