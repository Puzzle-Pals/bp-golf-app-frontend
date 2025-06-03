import { useState, useEffect } from 'react';

export default function ScoringSystemToggle() {
  const [pointsSystemEnabled, setPointsSystemEnabled] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line
  }, []);

  const fetchStatus = async () => {
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

  const handleToggle = async () => {
    try {
      setError('');
      setSuccess('');
      const newState = !pointsSystemEnabled;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/scoring_system`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pointsSystemEnabled: newState }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setPointsSystemEnabled(newState);
      setSuccess(`Points system ${newState ? 'enabled' : 'disabled'}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3 style={{ color: '#3C2F2F', fontWeight: 'bold', marginBottom: '0.5rem' }}>Points System</h3>
      <div style={{ marginBottom: '1rem' }}>
        <span style={{ color: '#3C2F2F' }}>3 for Win, 2 for 2nd, 1 for Highest Score</span>
      </div>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      {success && <p style={{ color: '#1B4D3E' }}>{success}</p>}
      <button
        onClick={handleToggle}
        style={{
          backgroundColor: pointsSystemEnabled ? '#C71585' : '#3C2F2F',
          color: '#F5E8C7',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          transition: 'background-color 0.2s, color 0.2s'
        }}
      >
        {pointsSystemEnabled ? 'Disable Points System' : 'Enable Points System'}
      </button>
    </div>
  );
}