import { useState, useEffect } from 'react';

export default function WeeklyRoundManagement() {
  const [rounds, setRounds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRounds();
    // eslint-disable-next-line
  }, []);

  const fetchRounds = async () => {
    try {
      setError('');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_rounds`);
      if (!res.ok) throw new Error('Failed to fetch weekly rounds');
      const data = await res.json();
      setRounds(data);
    } catch (err) {
      setError('Failed to fetch weekly rounds');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this round?')) return;
    setError('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/weekly_rounds/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete round');
      fetchRounds();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      <h3 style={{ color: '#3C2F2F', fontWeight: 'bold', marginBottom: '1rem' }}>Weekly Rounds Management</h3>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      {rounds.length === 0 ? (
        <p>No weekly rounds available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {rounds.map(round => (
            <li key={round.id} style={{ background: '#F5E8C7', color: '#3C2F2F', marginBottom: '1rem', padding: '1rem', borderRadius: '0.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                <strong>Week {round.week}</strong> - {round.date} - {round.details}
              </span>
              <button
                onClick={() => handleDelete(round.id)}
                style={{
                  backgroundColor: '#C71585',
                  color: '#F5E8C7',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  transition: 'background-color 0.2s, color 0.2s'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}