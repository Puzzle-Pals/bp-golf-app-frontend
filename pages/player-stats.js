import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PlayerStats() {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/player-stats');
        if (!res.ok) throw new Error('Failed to fetch player stats');
        const data = await res.json();
        setStats(data);
      } catch {
        setError('Failed to fetch player stats');
      }
    };
    fetchStats();
  }, []);

  function getPlayerLink(row) {
    if (row.player_id) return `/players/${row.player_id}`;
    if (row.firstName && row.lastName) {
      return `/players/${encodeURIComponent(
        (row.firstName + '-' + row.lastName).toLowerCase()
      )}`;
    }
    if (row.name) {
      // Attempt split for fallback
      const parts = row.name.split(' ');
      if (parts.length >= 2)
        return `/players/${encodeURIComponent(
          (parts[0] + '-' + parts.slice(1).join('-')).toLowerCase()
        )}`;
      return `/players/${encodeURIComponent(row.name.toLowerCase())}`;
    }
    return '#';
  }

  function getPlayerDisplay(row) {
    if (row.firstName && row.lastName) return `${row.firstName} ${row.lastName}`;
    if (row.name) return row.name;
    return "Unknown";
  }

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
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Player Stats</h2>
        {error ? (
          <p style={{ color: '#C71585' }}>{error}</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#F5E8C7' }}>
            <thead style={{ backgroundColor: '#3C2F2F' }}>
              <tr>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Player</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Average Score</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Rounds Played</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ padding: '1rem', textAlign: 'center' }}>No stats available.</td>
                </tr>
              ) : (
                stats.map((row, idx) => (
                  <tr key={row.player_id || idx} style={{ backgroundColor: idx % 2 === 0 ? '#2A3B35' : '#1B4D3E' }}>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>
                      <Link href={getPlayerLink(row)} style={{ color: '#DDE5E0', textDecoration: 'underline' }}>
                        {getPlayerDisplay(row)}
                      </Link>
                    </td>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{row.averagescore}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{row.roundsplayed}</td>
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