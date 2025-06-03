import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';

export default function WeeklyRoundManagement() {
  const [rounds, setRounds] = useState([]);
  const [form, setForm] = useState({ event_id: '', player_id: '', score: '', points: '', week_number: '' });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchRounds();
    fetchEvents();
    fetchPlayers();
  }, []);

  async function fetchRounds() {
    try {
      const data = await adminApi('getWeeklyRounds');
      setRounds(data);
      setError('');
    } catch (err) { setError(err.message); }
  }
  async function fetchEvents() {
    try { setEvents(await adminApi('getEvents')); } catch {}
  }
  async function fetchPlayers() {
    try { setPlayers(await adminApi('getPlayers')); } catch {}
  }

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi('updateWeeklyRound', { ...form, id: editing });
      } else {
        await adminApi('addWeeklyRound', form);
      }
      setForm({ event_id: '', player_id: '', score: '', points: '', week_number: '' });
      setEditing(null);
      fetchRounds();
    } catch (err) { setError(err.message); }
  }

  function handleEdit(round) {
    setForm({
      event_id: round.event_id,
      player_id: round.player_id,
      score: round.score,
      points: round.points,
      week_number: round.week_number
    });
    setEditing(round.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this round?')) return;
    try {
      await adminApi('deleteWeeklyRound', { id });
      fetchRounds();
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="mb-4">
      <h3>Weekly Round Management</h3>
      <form onSubmit={handleAddOrUpdate} className="mb-3">
        <select value={form.event_id} onChange={e => setForm(f => ({ ...f, event_id: e.target.value }))} required className="me-2">
          <option value="">Select Event</option>
          {events.map(ev => <option key={ev.id} value={ev.id}>{ev.date} – {ev.course}</option>)}
        </select>
        <select value={form.player_id} onChange={e => setForm(f => ({ ...f, player_id: e.target.value }))} required className="me-2">
          <option value="">Select Player</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <input placeholder="Score" type="number" value={form.score} onChange={e => setForm(f => ({ ...f, score: e.target.value }))} required className="me-2" />
        <input placeholder="Points" type="number" value={form.points} onChange={e => setForm(f => ({ ...f, points: e.target.value }))} className="me-2" />
        <input placeholder="Week #" type="number" value={form.week_number} onChange={e => setForm(f => ({ ...f, week_number: e.target.value }))} className="me-2" />
        <button type="submit" className="btn btn-primary btn-sm me-2">{editing ? 'Update' : 'Add'} Round</button>
        {editing && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setEditing(null); setForm({ event_id: '', player_id: '', score: '', points: '', week_number: '' }); }}>Cancel</button>}
      </form>
      {error && <div className="text-danger mb-2">{error}</div>}
      <ul>
        {rounds.map(round => (
          <li key={round.id}>
            Event: {round.event_id}, Player: {round.player_id}, Score: {round.score}, Points: {round.points}, Week: {round.week_number}
            <button className="btn btn-link btn-sm" onClick={() => handleEdit(round)}>Edit</button>
            <button className="btn btn-link btn-sm text-danger" onClick={() => handleDelete(round.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}