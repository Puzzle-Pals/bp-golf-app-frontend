import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PlayerStats() {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(`${API_BASE_URL}/api/players`);
        setPlayers(response.data.players || []);
      } catch (err) {
        setError('Failed to fetch player stats, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        // setPlayers([
        //   { id: 1, name: 'Player 1', handicap: 10 },
        //   { id: 2, name: 'Player 2', handicap: 12 },
        // ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Player Stats</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {players.length > 0 ? (
        <ul>
          {players.map((item, index) => (
            <li key={index}>{item.name}: Handicap {item.handicap}</li>
          ))}
        </ul>
      ) : (
        <p>No player stats available</p>
      )}
    </div>
  );
}