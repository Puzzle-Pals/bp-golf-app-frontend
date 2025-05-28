import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function WeeklyResults() {
  const [news, setNews] = useState({ date: '', details: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Use relative path for API, not NEXT_PUBLIC_API_URL
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data.length > 0 ? data[0] : { date: '', details: '' });
      } catch {
        setError('Failed to fetch news');
      }
    };
    fetchNews();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E' }}>
      <nav
        style={{
          backgroundColor: '#3C2F2F',
          padding: '1rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            href="/"
            style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}
          >
            BP Men’s League
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link
              href="/weekly-results"
              style={{ color: '#F5E8C7', textDecoration: 'none', cursor: 'pointer' }}
            >
              Weekly Results
            </Link>
            <Link
              href="/player-stats"
              style={{ color: '#F5E8C7', textDecoration: 'none', cursor: 'pointer' }}
            >
              Player Stats
            </Link>
            <Link
              href="/leaderboard"
              style={{ color: '#F5E8C7', textDecoration: 'none', cursor: 'pointer' }}
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </nav>

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 0',
          textAlign: 'center',
          color: '#F5E8C7',
        }}
      >
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Welcome to BP Men’s League
        </h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
          Track your scores, stats, and standings in our men's golf league!
        </p>

        <div
          style={{
            backgroundColor: '#F5E8C7',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            margin: '0 auto',
            color: '#3C2F2F',
          }}
        >
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Latest News</h3>
          {error ? (
            <p style={{ color: '#C71585' }}>{error}</p>
          ) : (
            <>
              <p>
                <strong>Date:</strong> {news.date || 'No date available'}
              </p>
              <p>{news.details || 'No news available.'}</p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}