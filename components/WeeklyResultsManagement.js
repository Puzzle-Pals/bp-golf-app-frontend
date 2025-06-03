import React, { useEffect, useState } from 'react';
import { adminApi } from '../utils/api';

export default function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState({
    weekly_round_id: '',
    winner1_id: '',
    winner2_id: '',
    second_place1_id: '',
    second_place2_id: '',
    deuce_pot1_id: '',
    deuce_pot2_id: '',
    closest_to_pin_id: '',
    highest_score_id: ''
  });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [rounds, setRounds] = useState([]);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchResults();
    fetchRounds();
    fetchPlayers();
  }, []);

  async function fetchResults() {
    try {
      const data = await adminApi('getWeeklyResults');
      setResults(data);
      setError('');
    } catch (err) { setError(err.message); }
  }
  async function fetchRounds() {
    try { setRounds(await adminApi('getWeeklyRounds')); } catch {}
  }
  async function fetchPlayers() {
    try { setPlayers(await adminApi('getPlayers')); } catch {}
  }

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await adminApi('updateWeeklyResult', { ...form, id: editing });
      } else {
        await adminApi('addWeeklyResult', form);
      }
      setForm({
        weekly_round_id: '',
        winner1_id: '',
        winner2_id: '',
        second_place1_id: '',
        second_place2_id: '',
        deuce_pot1_id: '',
        deuce_pot2_id: '',
        closest_to_pin_id: '',
        highest_score_id: ''
      });
      setEditing(null);
      fetchResults();
    } catch (err) { setError(err.message); }
  }

  function handleEdit(res) {
    setForm({
      weekly_round_id: res.weekly_round_id,
      winner1_id: res.winner1_id || '',
      winner2_id: res.winner2_id || '',
      second_place1_id: res.second_place1_id || '',
      second_place2_id: res.second_place2_id || '',
      deuce_pot1_id: res.deuce_pot1_id || '',
      deuce_pot2_id: res.deuce_pot2_id || '',
      closest_to_pin_id: res.closest_to_pin_id || '',
      highest_score_id: res.highest_score_id || ''
    });
    setEditing(res.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this weekly result?')) return;
    try {
      await adminApi('deleteWeeklyResult', { id });
      fetchResults();
    } catch (err) { setError(err.message); }
  }

  return (
    <div className="mb-4">
      <h3>Weekly Results Management</h3>
      <form onSubmit={handleAddOrUpdate} className="mb-3">
        <select value={form.weekly_round_id} onChange={e => setForm(f => ({ ...f, weekly_round_id: e.target.value }))} required className="me-2">
          <option value="">Select Weekly Round</option>
          {rounds.map(r => <option key={r.id} value={r.id}>Round {r.id}</option>)}
        </select>
        {/* Winner 1 & 2 */}
        <select value={form.winner1_id} onChange={e => setForm(f => ({ ...f, winner1_id: e.target.value }))} className="me-2">
          <option value="">Winner 1</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={form.winner2_id} onChange={e => setForm(f => ({ ...f, winner2_id: e.target.value }))} className="me-2">
          <option value="">Winner 2</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {/* Second Place 1 & 2 */}
        <select value={form.second_place1_id} onChange={e => setForm(f => ({ ...f, second_place1_id: e.target.value }))} className="me-2">
          <option value="">Second Place 1</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={form.second_place2_id} onChange={e => setForm(f => ({ ...f, second_place2_id: e.target.value }))} className="me-2">
          <option value="">Second Place 2</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {/* Deuce Pot 1 & 2 */}
        <select value={form.deuce_pot1_id} onChange={e => setForm(f => ({ ...f, deuce_pot1_id: e.target.value }))} className="me-2">
          <option value="">Deuce Pot 1</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={form.deuce_pot2_id} onChange={e => setForm(f => ({ ...f, deuce_pot2_id: e.target.value }))} className="me-2">
          <option value="">Deuce Pot 2</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        {/* Closest to Pin, Highest Score */}
        <select value={form.closest_to_pin_id} onChange={e => setForm(f => ({ ...f, closest_to_pin_id: e.target.value }))} className="me-2">
          <option value="">Closest to Pin</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={form.highest_score_id} onChange={e => setForm(f => ({ ...f, highest_score_id: e.target.value }))} className="me-2">
          <option value="">Highest Score</option>
          {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button type="submit" className="btn btn-primary btn-sm me-2">{editing ? 'Update' : 'Add'} Result</button>
        {editing && <button type="button" className="btn btn-secondary btn-sm" onClick={() => { setEditing(null); setForm({
          weekly_round_id: '',
          winner1_id: '',
          winner2_id: '',
          second_place1_id: '',
          second_place2_id: '',
          deuce_pot1_id: '',
          deuce_pot2_id: '',
          closest_to_pin_id: '',
          highest_score_id: ''
        }); }}>Cancel</button>}
      </form>
      {error && <div className="text-danger mb-2">{error}</div>}
      <ul>
        {results.map(res => (
          <li key={res.id}>
            Round: {res.weekly_round_id}, Winners: {res.winner1_id}, {res.winner2_id}, Second: {res.second_place1_id}, {res.second_place2_id}
            <button className="btn btn-link btn-sm" onClick={() => handleEdit(res)}>Edit</button>
            <button className="btn btn-link btn-sm text-danger" onClick={() => handleDelete(res.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}