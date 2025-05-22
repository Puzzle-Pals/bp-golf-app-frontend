import axios from 'axios';
import { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${API_BASE_URL}/api/news`);
        setNews(response.data.news || []);
      } catch (err) {
        setError('Failed to fetch news, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        setNews([
          { id: 1, title: 'Mock News 1', content: 'Mock content 1' },
          { id: 2, title: 'Mock News 2', content: 'Mock content 2' },
        ]);
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
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
}