import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyResultsManagement() {
  const [results, setResults] = useState([]);
  const [pointsSystemEnabled, setPointsSystemEnabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResults();
    fetchPointsSystem();
  }, []);

  const fetchResults = async () => {
    try {
      setError('');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch results');
    }
  };

  const fetchPointsSystem = async () => {
    try {
      setError('');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPointsSystemEnabled(Boolean(data.pointsSystemEnabled));
    } catch (err) {
      setError('Failed to fetch points system');
    }
  };

  const handleTogglePointsSystem = async () => {
    try {
      setError('');
      const newState = !pointsSystemEnabled;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pointsSystemEnabled: newState }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setPointsSystemEnabled(newState);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this result?')) return;
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_results/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete result');
      fetchResults();
    } catch (err) {
      setError(err.message);
    }
  };

  // Helper to safely access nested props
  const safe = (obj, path, fallback = '') =>
    path.reduce((o, k) => (o && o[k] !== undefined && o[k] !== null ? o[k] : fallback), obj);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F' }}>Manage Weekly Results</h2>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      <div>
        <label style={{ display: 'block', color: '#3C2F2F', fontWeight: '600', marginBottom: '0.5rem' }}>
          Points System (3 for Win, 2 for 2nd, 1 for Highest Score)
        </label>
        <button
          onClick={handleTogglePointsSystem}
          style={{
            backgroundColor: pointsSystemEnabled ? '#C71585' : '#3C2F2F',
            color: '#F5E8C7',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.2s, color 0.2s',
          }}
        >
          {pointsSystemEnabled ? 'Disable Points System' : 'Enable Points System'}
        </button>
      </div>
      <Link href="/admin/add-week" passHref legacyBehavior>
        <button
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s', marginBottom: '1rem' }}
        >
          Add Week
        </button>
      </Link>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>Existing Results</h3>
        {results.map((result) => (
          <div key={result.id || result.week} style={{ backgroundColor: '#F5E8C7', padding: '1rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
            <p style={{ color: '#3C2F2F', fontWeight: '600' }}>Week {result.week}</p>
            <p style={{ color: '#3C2F2F' }}>
              Winners: Players {safe(result, ['winners', 'player1'])}, {safe(result, ['winners', 'player2'])} (Score: {safe(result, ['winners', 'score'])})
            </p>
            <p style={{ color: '#3C2F2F' }}>
              2nd Place: Players {safe(result, ['secondPlace', 'player1'])}, {safe(result, ['secondPlace', 'player2'])} (Score: {safe(result, ['secondPlace', 'score'])})
            </p>
            <p style={{ color: '#3C2F2F' }}>
              Highest Score: Players {safe(result, ['highestScore', 'player1'])}, {safe(result, ['highestScore', 'player2'])} (Score: {safe(result, ['highestScore', 'score'])})
            </p>
            <p style={{ color: '#3C2F2F' }}>Deuce Pot: Player {safe(result, ['deucePot', 'player'])}</p>
            <p style={{ color: '#3C2F2F' }}>Closest to Pin: Player {safe(result, ['closestToPin', 'player'])}</p>
            <p style={{ color: '#3C2F2F', fontWeight: '600', marginTop: '0.5rem' }}>Prize Payouts</p>
            <p style={{ color: '#3C2F2F' }}>Total: ${safe(result, ['payouts', 'total'], 'N/A')}</p>
            <p style={{ color: '#3C2F2F' }}>
              Winners (30%): ${safe(result, ['payouts', 'winners', 'amount'])} to Players {(safe(result, ['payouts', 'winners', 'players'], [])).join(', ')}
            </p>
            <p style={{ color: '#3C2F2F' }}>
              2nd Place (20%): ${safe(result, ['payouts', 'secondPlace', 'amount'])} to Players {(safe(result, ['payouts', 'secondPlace', 'players'], [])).join(', ')}
            </p>
            <p style={{ color: '#3C2F2F' }}>
              Deuce Pot (20%): ${safe(result, ['payouts', 'deucePot', 'amount'])} to Players {(safe(result, ['payouts', 'deucePot', 'players'], [])).join(', ')}
            </p>
            <p style={{ color: '#3C2F2F' }}>
              Closest to Pin (20%): ${safe(result, ['payouts', 'closestToPin', 'amount'])} to Player {(safe(result, ['payouts', 'closestToPin', 'players'], [])[0] || '')}
            </p>
            <p style={{ color: '#3C2F2F' }}>
              Highest Score (10%): ${safe(result, ['payouts', 'highestScore', 'amount'])} to Player {(safe(result, ['payouts', 'highestScore', 'players'], [])[0] || '')}
            </p>
            <button
              onClick={() => handleDelete(result.id)}
              style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s', marginTop: '0.5rem' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}