import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch('/api/weekly-results');
        if (!res.ok) throw new Error('Failed to fetch weekly results');
        const data = await res.json();
        setResults(data);
      } catch {
        setError('Failed to fetch weekly results');
      }
    };
    fetchResults();
  }, []);

  // Helper to get player link from name/id
  function getPlayerLink(player) {
    if (!player) return "#";
    if (player.id) return `/players/${player.id}`;
    if (player.firstName && player.lastName) {
      return `/players/${encodeURIComponent((player.firstName + '-' + player.lastName).toLowerCase())}`;
    }
    if (typeof player === "string") {
      const parts = player.split(' ');
      if (parts.length >= 2) {
        return `/players/${encodeURIComponent((parts[0] + '-' + parts.slice(1).join('-')).toLowerCase())}`;
      }
      return `/players/${encodeURIComponent(player.toLowerCase())}`;
    }
    return "#";
  }
  function renderPlayerLinks(players) {
    if (!players || players.length === 0) return "";
    return players.filter(Boolean).map((name, i) => (
      <span key={name + i}>
        <Link href={getPlayerLink(name)} style={{ color: '#DDE5E0', textDecoration: 'underline' }}>{name}</Link>
        {i < players.length - 1 ? ', ' : ''}
      </span>
    ));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
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
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 0', color: '#F5E8C7' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Weekly Results
        </h2>
        {error ? (
          <p style={{ color: '#C71585' }}>{error}</p>
        ) : results.length === 0 ? (
          <p>No weekly results available.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#F5E8C7', margin: '0 auto' }}>
            <thead style={{ backgroundColor: '#3C2F2F' }}>
              <tr>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Week</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Winner(s)</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Second Place</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Deuce Pot</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Closest to Pin</th>
                <th style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>Highest Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res, idx) => (
                <tr key={res.id || idx} style={{ backgroundColor: idx % 2 === 0 ? '#2A3B35' : '#1B4D3E' }}>
                  <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>{res.week_number || idx + 1}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>
                    {renderPlayerLinks(Array.isArray(res.wins) ? res.wins : [])}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>
                    {renderPlayerLinks(Array.isArray(res.second) ? res.second : [])}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>
                    {renderPlayerLinks(Array.isArray(res.deuce) ? res.deuce : [])}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>
                    {res.ctp ? <Link href={getPlayerLink(res.ctp)} style={{ color: '#DDE5E0', textDecoration: 'underline' }}>{res.ctp}</Link> : ''}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #F5E8C7' }}>
                    {renderPlayerLinks(Array.isArray(res.high_score) ? res.high_score : [])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}