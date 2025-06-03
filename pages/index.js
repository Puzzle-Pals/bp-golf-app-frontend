import React, { useEffect, useState } from "react";
import { fetchEvents } from "../utils/api";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Upcoming Events</h1>
      {error && <div className="text-danger">{error}</div>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.date} – {event.course}
          </li>
        ))}
      </ul>
    </div>
  );
}