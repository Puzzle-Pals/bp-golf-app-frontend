// pages/admin/add-week.js

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddWeek() {
  const router = useRouter();

  const [weekNumber, setWeekNumber] = useState('');
  const [winners, setWinners] = useState('');
  const [secondPlace, setSecondPlace] = useState('');
  const [highestScore, setHighestScore] = useState('');
  const [deucePot, setDeucePot] = useState('');
  const [closestToPin, setClosestToPin] = useState('');
  const [prizePayouts, setPrizePayouts] = useState('');
  const [loading, setLoading] = useState(false);

  async function saveWeek() {
    if (!weekNumber) return alert('Week Number is required');
    setLoading(true);

    try {
      const res = await fetch('/api/weekly-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weekNumber,
          winners,
          secondPlace,
          highestScore,
          deucePot,
          closestToPin,
          prizePayouts,
        }),
      });
      if (!res.ok) throw new Error('Failed to save week');
      alert('Week saved successfully');
      router.push('/admin/weekly-results');
    } catch {
      alert('Error saving week');
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Add Week</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Week Number:
          <input
            type="number"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Winners:
          <input
            type="text"
            value={winners}
            onChange={(e) => setWinners(e.target.value)}
            placeholder="e.g. John & Mike"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          2nd Place:
          <input
            type="text"
            value={secondPlace}
            onChange={(e) => setSecondPlace(e.target.value)}
            placeholder="e.g. Dave & Steve"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Highest Score:
          <input
            type="text"
            value={highestScore}
            onChange={(e) => setHighestScore(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Deuce Pot:
          <input
            type="text"
            value={deucePot}
            onChange={(e) => setDeucePot(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Closest to Pin:
          <input
            type="text"
            value={closestToPin}
            onChange={(e) => setClosestToPin(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Prize Payouts:
          <textarea
            value={prizePayouts}
            onChange={(e) => setPrizePayouts(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>

      <button onClick={saveWeek} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        Save Week
      </button>
    </div>
  );
}
