import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data);
      } catch {
        setError('Failed to fetch news');
      }
    };
    fetchNews();
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
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>News</h2>
        {error && <p style={{ color: '#C71585' }}>{error}</p>}
        {news.length === 0 ? (
          <p>No news available.</p>
        ) : (
          <ul>
            {news.map((item, idx) => (
              <li key={item.id || idx} style={{ marginBottom: '2rem' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {item.title || 'Untitled'}
                  {item.date && (
                    <span style={{ marginLeft: 8, color: "#bbb", fontSize: "0.9em" }}>
                      ({new Date(item.date).toLocaleDateString()})
                    </span>
                  )}
                </div>
                {item.details && <div>{item.details}</div>}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}