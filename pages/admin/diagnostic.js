import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Diagnostic() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/diagnostic'); // Replace with your actual API endpoint
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch diagnostic data');
        console.error(err);
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