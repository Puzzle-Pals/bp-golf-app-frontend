import { useState, useEffect } from 'react';

const TOKEN_KEY = "admin_jwt";

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/admin/news', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data.news || data || []);
      } catch (err) {
        setError('Failed to fetch news');
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {news.length > 0 ? (
        <ul>
          {news.map((item, index) => (
            <li key={item.id || index}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
}