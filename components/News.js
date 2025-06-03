import { useState, useEffect } from 'react';

// Use your new admin token key for consistency
const TOKEN_KEY = "adminToken";

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : "";
        const res = await fetch('/api/admin/news', {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        // Support both array or object with .news property
        setNews(Array.isArray(data) ? data : data.news || []);
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
            <li key={item.id || index}>
              <strong>{item.title || item.headline || "Untitled"}</strong>
              {item.date && (
                <span style={{ marginLeft: 8, color: "#666", fontSize: "0.9em" }}>
                  ({new Date(item.date).toLocaleDateString()})
                </span>
              )}
              {item.details && <div>{item.details}</div>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
}