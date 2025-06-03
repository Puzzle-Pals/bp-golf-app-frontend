import { useState, useEffect } from 'react';
import { adminApi } from '../utils/api';

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => { fetchNews(); }, []);
  async function fetchNews() {
    try {
      const data = await adminApi('getNews');
      setNews(Array.isArray(data) ? data : data.news || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch news');
    }
  }

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