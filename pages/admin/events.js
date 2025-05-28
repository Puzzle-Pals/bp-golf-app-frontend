import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = "admin_jwt";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('Lake of the Sandhills Golf Course');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check for JWT and redirect if not authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) {
      router.replace('/admin/admin'); // or '/admin' if that's your login page
      return;
    }
    fetchEvents(token);
  }, [router]);

  async function fetchEvents(token) {
    try {
      const res = await fetch('/api/admin/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data.events || data);
    } catch {
      setError('Failed to fetch events');
    }
  }

  async function addEvent() {
    if (!name.trim() || !date.trim()) return alert('Event name and date are required');
    setLoading(true);
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace('/admin/admin');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, course, date, details }),
      });
      if (!res.ok) throw new Error('Failed to add event');
      setName('');
      setDate('');
      setDetails('');
      setCourse('Lake of the Sandhills Golf Course');
      fetchEvents(token);
    } catch {
      alert('Error adding event');
    }
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    router.replace('/admin/admin');
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#C71585', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
          Logout
        </button>
      </div>
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
          <li key={e._id || e.id}>
            <strong>{e.name}</strong> on {new Date(e.date).toLocaleDateString()} at {e.course}
            {e.details && <p>{e.details}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}