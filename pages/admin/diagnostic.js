import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Diagnostic() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${API_BASE_URL}/api/diagnostic`);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch diagnostic data, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        setData({ diagnostics: [] });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Diagnostic Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading diagnostic data...</p>
      )}
    </div>
  );
}