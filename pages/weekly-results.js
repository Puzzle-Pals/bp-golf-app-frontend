import axios from 'axios';
import { useState, useEffect } from 'react';

export default function WeeklyResults() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${API_BASE_URL}/api/weekly_results`);
        setResults(response.data.weekly_results || []);
      } catch (err) {
        setError('Failed to fetch weekly results, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        // setResults([
        //   { id: 1, player_id: 1, week: 1, score: 72 },
        //   { id: 2, player_id: 2, week: 1, score: 75 },
        // ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Weekly Results</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {results.length > 0 ? (
        <ul>
          {results.map((item, index) => (
            <li key={index}>Player {item.player_id}, Week {item.week}: {item.score}</li>
          ))}
        </ul>
      ) : (
        <p>No weekly results available</p>
      )}
    </div>
  );
}