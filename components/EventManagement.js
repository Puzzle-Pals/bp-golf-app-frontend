import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';

export default function EventManagement() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ date: '', course: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => { fetchEvents(); }, []);

  async function fetchEvents() {
    try {
      const data = await adminApi('getEvents');
      setEvents(data);
      setError('');
    } catch (err) { setError(err.message); }
  }

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi('updateEvent', { ...form, id: editing });
      } else {
        await adminApi('addEvent', form);
      }
      setForm({ date: '', course: '' });
      setEditing(null);
      fetchEvents();
    } catch (err) { setError(err.message); }
  }

  function handleEdit(event) {
    setForm({ date: event.date, course: event.course });
    setEditing(event.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this event?')) return;
    try {
      await adminApi('deleteEvent', { id });
      fetchEvents();
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="mb-4">
      <h3>Event Management</h3>
      <form onSubmit={handleAddOrUpdate} className="mb-3">
        <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className="me-2" />
        <input placeholder="Course" value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} required className="me-2" />
        <button type="submit" className="btn btn-primary btn-sm me-2">{editing ? 'Update' : 'Add'} Event</button>
        {editing && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setEditing(null); setForm({ date: '', course: '' }); }}>Cancel</button>}
      </form>
      {error && <div className="text-danger mb-2">{error}</div>}
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {ev.date} – {ev.course}
            <button className="btn btn-link btn-sm" onClick={() => handleEdit(ev)}>Edit</button>
            <button className="btn btn-link btn-sm text-danger" onClick={() => handleDelete(ev.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}