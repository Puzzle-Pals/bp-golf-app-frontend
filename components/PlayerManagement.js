import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';

export default function PlayerManagement() {
  const [players, setPlayers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [error, setError] = useState('');

  useEffect(() => { fetchPlayers(); }, []);

  async function fetchPlayers() {
    try {
      const data = await adminApi('getPlayers');
      setPlayers(data);
      setError('');
    } catch (err) { setError(err.message); }
  }

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi('updatePlayer', { ...form, id: editing });
      } else {
        await adminApi('addPlayer', form);
      }
      setForm({ name: '', email: '', phone: '' });
      setEditing(null);
      fetchPlayers();
    } catch (err) { setError(err.message); }
  }

  function handleEdit(player) {
    setForm({ name: player.name, email: player.email, phone: player.phone });
    setEditing(player.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this player?')) return;
    try {
      await adminApi('deletePlayer', { id });
      fetchPlayers();
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="mb-4">
      <h3>Player Management</h3>
      <form onSubmit={handleAddOrUpdate} className="mb-3">
        <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="me-2" />
        <input placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="me-2" />
        <input placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="me-2" />
        <button type="submit" className="btn btn-primary btn-sm me-2">{editing ? 'Update' : 'Add'} Player</button>
        {editing && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setEditing(null); setForm({ name: '', email: '', phone: '' }); }}>Cancel</button>}
      </form>
      {error && <div className="text-danger mb-2">{error}</div>}
      <ul>
        {players.map(p => (
          <li key={p.id}>
            {p.name} ({p.email || 'no email'})
            <button className="btn btn-link btn-sm" onClick={() => handleEdit(p)}>Edit</button>
            <button className="btn btn-link btn-sm text-danger" onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}