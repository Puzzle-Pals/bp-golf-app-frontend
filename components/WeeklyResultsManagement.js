import { useState, useEffect } from 'react';
import Link from 'next/link';

const TOKEN_KEY = "admin_jwt";

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
      const res = await fetch('/api/admin/weekly_results', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data.weekly_results || data.results || data);
    } catch (err) {
      setError('Failed to fetch results');
    }
  };

  const fetchPointsSystem = async () => {
    try {
      const res = await fetch('/api/admin/scoring_system', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        }
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPointsSystemEnabled(data.pointsSystemEnabled || data.enabled || false);
    } catch (err) {
      setError('Failed to fetch points system');
    }
  };

  const handleTogglePointsSystem = async () => {
    try {
      const newState = !pointsSystemEnabled;
      const res = await fetch('/api/admin/scoring_system', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        },
        body: JSON.stringify({ pointsSystemEnabled: newState }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setPointsSystemEnabled(newState);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/weekly_results/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
        }
      });
      if (!res.ok) throw new Error('Failed to delete result');
      fetchResults();
    } catch (err) {
      setError(err.message);
    }
  };

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
          onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = pointsSystemEnabled ? '#C71585' : '#3C2F2F'; e.target.style.color = '#F5E8C7'; }}
        >
          {pointsSystemEnabled ? 'Disable Points System' : 'Enable Points System'}
        </button>
      </div>
      <Link href="/admin/add-week">
        <button
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
          onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
        >
          Add Week
        </button>
      </Link>
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#3C2F2F', marginBottom: '1rem' }}>Existing Results</h3>
        {results.map((result) => (
          <div key={result.id} style={{ backgroundColor: '#F5E8C7', padding: '1rem', borderRadius: '0.25rem', marginBottom: '1rem' }}>
            <p style={{ color: '#3C2F2F', fontWeight: '600' }}>Week {result.week}</p>
            {/* Defensive rendering in case of missing/flat data */}
            <p style={{ color: '#3C2F2F' }}>Winners: {result.winners?.player1 || result.winners?.[0] || ''}{result.winners?.player2 ? `, ${result.winners.player2}` : ''} {result.winners?.score ? `(Score: ${result.winners.score})` : ''}</p>
            <p style={{ color: '#3C2F2F' }}>2nd Place: {result.secondPlace?.player1 || result.secondPlace?.[0] || ''}{result.secondPlace?.player2 ? `, ${result.secondPlace.player2}` : ''} {result.secondPlace?.score ? `(Score: ${result.secondPlace.score})` : ''}</p>
            <p style={{ color: '#3C2F2F' }}>Highest Score: {result.highestScore?.player1 || result.highestScore?.[0] || ''}{result.highestScore?.player2 ? `, ${result.highestScore.player2}` : ''} {result.highestScore?.score ? `(Score: ${result.highestScore.score})` : ''}</p>
            <p style={{ color: '#3C2F2F' }}>Deuce Pot: {result.deucePot?.player || result.deucePot?.[0] || ''}</p>
            <p style={{ color: '#3C2F2F' }}>Closest to Pin: {result.closestToPin?.player || result.closestToPin?.[0] || ''}</p>
            <p style={{ color: '#3C2F2F', fontWeight: '600', marginTop: '0.5rem' }}>Prize Payouts</p>
            <p style={{ color: '#3C2F2F' }}>Total: ${result.payouts?.total || 'N/A'}</p>
            <p style={{ color: '#3C2F2F' }}>Winners (30%): ${result.payouts?.winners?.amount} to {Array.isArray(result.payouts?.winners?.players) ? result.payouts?.winners?.players.join(', ') : ''}</p>
            <p style={{ color: '#3C2F2F' }}>2nd Place (20%): ${result.payouts?.secondPlace?.amount} to {Array.isArray(result.payouts?.secondPlace?.players) ? result.payouts?.secondPlace?.players.join(', ') : ''}</p>
            <p style={{ color: '#3C2F2F' }}>Deuce Pot (20%): ${result.payouts?.deucePot?.amount} to {Array.isArray(result.payouts?.deucePot?.players) ? result.payouts?.deucePot?.players.join(', ') : ''}</p>
            <p style={{ color: '#3C2F2F' }}>Closest to Pin (20%): ${result.payouts?.closestToPin?.amount} to {Array.isArray(result.payouts?.closestToPin?.players) ? result.payouts?.closestToPin?.players[0] : ''}</p>
            <p style={{ color: '#3C2F2F' }}>Highest Score (10%): ${result.payouts?.highestScore?.amount} to {Array.isArray(result.payouts?.highestScore?.players) ? result.payouts?.highestScore?.players[0] : ''}</p>
            <button
              onClick={() => handleDelete(result.id)}
              style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s', marginTop: '0.5rem' }}
              onMouseOver={(e) => { e.target.style.backgroundColor = '#87CEEB'; e.target.style.color = '#3C2F2F'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = '#C71585'; e.target.style.color = '#F5E8C7'; }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}