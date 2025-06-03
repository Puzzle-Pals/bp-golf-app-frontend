import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';

export default function PrizePayouts() {
  const [payouts, setPayouts] = useState([]);
  const [form, setForm] = useState({
    weekly_result_id: '',
    total_prize_pool: '',
    winners_amount: '',
    second_place_amount: '',
    deuce_pot_amount: '',
    closest_to_pin_amount: '',
    highest_score_amount: ''
  });
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  // For select dropdown
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchPayouts();
    fetchResults();
  }, []);

  async function fetchPayouts() {
    try {
      setPayouts(await apiFetch('/prize_payouts', { admin: true }));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchResults() {
    try {
      setResults(await apiFetch('/weekly_results', { admin: true }));
    } catch {}
  }

  async function handleAddOrUpdate(e) {
    e.preventDefault();
    try {
      if (editing) {
        await apiFetch('/prize_payouts', {
          method: 'PUT',
          data: { ...form, id: editing },
          admin: true,
        });
      } else {
        await apiFetch('/prize_payouts', {
          method: 'POST',
          data: form,
          admin: true,
        });
      }
      setForm({
        weekly_result_id: '',
        total_prize_pool: '',
        winners_amount: '',
        second_place_amount: '',
        deuce_pot_amount: '',
        closest_to_pin_amount: '',
        highest_score_amount: ''
      });
      setEditing(null);
      fetchPayouts();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(payout) {
    setForm({
      weekly_result_id: payout.weekly_result_id,
      total_prize_pool: payout.total_prize_pool,
      winners_amount: payout.winners_amount,
      second_place_amount: payout.second_place_amount,
      deuce_pot_amount: payout.deuce_pot_amount,
      closest_to_pin_amount: payout.closest_to_pin_amount,
      highest_score_amount: payout.highest_score_amount
    });
    setEditing(payout.id);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this payout?')) return;
    try {
      await apiFetch(`/prize_payouts?id=${id}`, { method: 'DELETE', admin: true });
      fetchPayouts();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mb-4">
      <h3>Prize Payout Management</h3>
      <form onSubmit={handleAddOrUpdate} className="mb-3">
        <select
          value={form.weekly_result_id}
          onChange={e => setForm(f => ({ ...f, weekly_result_id: e.target.value }))}
          required
          className="me-2"
        >
          <option value="">Select Weekly Result</option>
          {results.map(r => (
            <option key={r.id} value={r.id}>Result {r.id}</option>
          ))}
        </select>
        <input
          placeholder="Total Pool"
          type="number"
          value={form.total_prize_pool}
          onChange={e => setForm(f => ({ ...f, total_prize_pool: e.target.value }))}
          required
          className="me-2"
        />
        <input
          placeholder="Winners Amount"
          type="number"
          value={form.winners_amount}
          onChange={e => setForm(f => ({ ...f, winners_amount: e.target.value }))}
          className="me-2"
        />
        <input
          placeholder="Second Place Amount"
          type="number"
          value={form.second_place_amount}
          onChange={e => setForm(f => ({ ...f, second_place_amount: e.target.value }))}
          className="me-2"
        />
        <input
          placeholder="Deuce Pot Amount"
          type="number"
          value={form.deuce_pot_amount}
          onChange={e => setForm(f => ({ ...f, deuce_pot_amount: e.target.value }))}
          className="me-2"
        />
        <input
          placeholder="Closest to Pin Amount"
          type="number"
          value={form.closest_to_pin_amount}
          onChange={e => setForm(f => ({ ...f, closest_to_pin_amount: e.target.value }))}
          className="me-2"
        />
        <input
          placeholder="Highest Score Amount"
          type="number"
          value={form.highest_score_amount}
          onChange={e => setForm(f => ({ ...f, highest_score_amount: e.target.value }))}
          className="me-2"
        />
        <button type="submit" className="btn btn-primary btn-sm me-2">
          {editing ? 'Update' : 'Add'} Payout
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => { setEditing(null); setForm({
              weekly_result_id: '',
              total_prize_pool: '',
              winners_amount: '',
              second_place_amount: '',
              deuce_pot_amount: '',
              closest_to_pin_amount: '',
              highest_score_amount: ''
            }); }}
          >
            Cancel
          </button>
        )}
      </form>
      {error && <div className="text-danger mb-2">{error}</div>}
      <ul>
        {payouts.map(payout => (
          <li key={payout.id}>
            Result: {payout.weekly_result_id}, Total: {payout.total_prize_pool}
            <button className="btn btn-link btn-sm" onClick={() => handleEdit(payout)}>
              Edit
            </button>
            <button className="btn btn-link btn-sm text-danger" onClick={() => handleDelete(payout.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}