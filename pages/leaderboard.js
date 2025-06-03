import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        if (!res.ok) throw new Error('Failed to fetch leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch {
        setError('Failed to fetch leaderboard');
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>BP Men’s League</Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/weekly-results" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Weekly Results</Link>
            <Link href="/player-stats" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Player Stats</Link>
            <Link href="/leaderboard" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Leaderboard</Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Leaderboard</h2>
        {error ? (
          <p style={{ color: '#C71585' }}>{error}</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#F5E8C7' }}>
            <thead style={{ backgroundColor: '#3C2F2F' }}>
              <tr>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Rank</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Player</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Total Points</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Total Score</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Events Played</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '1rem', textAlign: 'center' }}>No leaderboard data available.</td>
                </tr>
              ) : (
                leaderboard.map((row, idx) => (
                  <tr key={row.player_id} style={{ backgroundColor: idx % 2 === 0 ? '#2A3B35' : '#1B4D3E' }}>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{idx + 1}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{row.name}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{row.totalpoints}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{row.totalscore}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{row.eventsplayed}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}