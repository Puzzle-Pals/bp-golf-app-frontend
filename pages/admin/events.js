// pages/admin/events.js

import { useState, useEffect } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('Lake of the Sandhills Golf Course');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch {
      setError('Failed to fetch events');
    }
  }

  async function addEvent() {
    if (!name.trim() || !date.trim()) return alert('Event name and date are required');
    setLoading(true);
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, course, date, details }),
      });
      if (!res.ok) throw new Error('Failed to add event');
      setName('');
      setDate('');
      setDetails('');
      setCourse('Lake of the Sandhills Golf Course');
      fetchEvents();
    } catch {
      alert('Error adding event');
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Events</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        >
          <option>Lake of the Sandhills Golf Course</option>
          <option>Other Course 1</option>
          <option>Other Course 2</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
        <textarea
          placeholder="Event Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
        />
      </div>
      <button onClick={addEvent} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        Add Event
      </button>

      <h2 style={{ marginTop: '2rem' }}>Upcoming Events</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {events.map((e) => (
          <li key={e._id}>
            <strong>{e.name}</strong> on {new Date(e.date).toLocaleDateString()} at {e.course}
            {e.details && <p>{e.details}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
