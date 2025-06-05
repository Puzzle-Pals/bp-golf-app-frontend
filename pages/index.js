import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [newsError, setNewsError] = useState('');
  const [eventsError, setEventsError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data);
      } catch {
        setNewsError('Failed to fetch news');
      }
    };
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch {
        setEventsError('Failed to fetch events');
      }
    };
    fetchNews();
    fetchEvents();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{
            color: '#F5E8C7',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            BP Men’s League
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/weekly-results" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Weekly Results</Link>
            <Link href="/player-stats" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Player Stats</Link>
            <Link href="/leaderboard" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Leaderboard</Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', color: '#F5E8C7' }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          letterSpacing: '1px'
        }}>
          Welcome to the BP Men’s League!
        </h1>
        <div style={{ background: '#3C2F2F', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '2rem', maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem', color: '#F5E8C7' }}>League News</h2>
          {newsError ? (
            <p style={{ color: '#C71585' }}>{newsError}</p>
          ) : news.length === 0 ? (
            <p>No news at this time.</p>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {news.map((item, idx) => (
                <li key={item.id || idx} style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.25rem',
                  borderBottom: idx !== news.length - 1 ? '1px solid #F5E8C733' : 'none'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#87CEEB' }}>
                    {item.date ? new Date(item.date).toLocaleDateString() : ''}
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', color: '#F5E8C7', fontWeight: 500 }}>{item.title}</div>
                  <div style={{ whiteSpace: 'pre-wrap', color: '#F5E8C7' }}>{item.details}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ background: '#3C2F2F', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '2rem', maxWidth: 700, margin: '2rem auto 0' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem', color: '#FFD700' }}>Upcoming Events</h2>
          {eventsError ? (
            <p style={{ color: '#C71585' }}>{eventsError}</p>
          ) : events.length === 0 ? (
            <p>No events at this time.</p>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {events.map((event, idx) => (
                <li key={event.id || idx} style={{
                  marginBottom: '1.5rem',
                  paddingBottom: '1.25rem',
                  borderBottom: idx !== events.length - 1 ? '1px solid #F5E8C733' : 'none'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#FFD700' }}>
                    {event.event_date ? new Date(event.event_date).toLocaleDateString() : ''}
                  </div>
                  <div style={{ whiteSpace: 'pre-wrap', color: '#F5E8C7', fontWeight: 500 }}>{event.title}</div>
                  <div style={{ whiteSpace: 'pre-wrap', color: '#F5E8C7' }}>{event.description}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}