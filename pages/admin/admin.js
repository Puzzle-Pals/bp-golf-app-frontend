import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const [players, setPlayers] = useState([]);
  const [events, setEvents] = useState([]);
  const [weeklyResults, setWeeklyResults] = useState([]);
  const [scoringSystem, setScoringSystem] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const [playersResponse, eventsResponse, resultsResponse, scoringResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/players`),
          axios.get(`${API_BASE_URL}/api/events`),
          axios.get(`${API_BASE_URL}/api/weekly_results`),
          axios.get(`${API_BASE_URL}/api/scoring_system`),
        ]);
        setPlayers(playersResponse.data.players || []);
        setEvents(eventsResponse.data.events || []);
        setWeeklyResults(resultsResponse.data.weekly_results || []);
        setScoringSystem(scoringResponse.data.scoring_system || []);
      } catch (err) {
        setError('Failed to fetch admin data, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        // setPlayers([
        //   { id: 1, name: 'Player 1', handicap: 10 },
        //   { id: 2, name: 'Player 2', handicap: 12 },
        // ]);
        // setEvents([
        //   { id: 1, title: 'Event 1', date: '2025-06-01' },
        //   { id: 2, title: 'Event 2', date: '2025-06-15' },
        // ]);
        // setWeeklyResults([
        //   { id: 1, player_id: 1, week: 1, score: 72 },
        //   { id: 2, player_id: 2, week: 1, score: 75 },
        // ]);
        // setScoringSystem([
        //   { id: 1, rule_name: 'Birdie', points: 3 },
        //   { id: 2, rule_name: 'Par', points: 1 },
        // ]);
      }
    };
    fetchData();
  }, []);

  const handleAddPlayer = async (name, handicap) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      await axios.post(`${API_BASE_URL}/api/players`, { name, handicap });
      router.reload();
    } catch (err) {
      setError('Failed to add player');
      console.error('Post error:', err.message);
    }
  };

  const handleUpdateScoring = async (id, rule_name, points) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      await axios.put(`${API_BASE_URL}/api/scoring_system`, { id, rule_name, points });
      router.reload();
    } catch (err) {
      setError('Failed to update scoring system');
      console.error('Put error:', err.message);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Players</h2>
      {players.length > 0 ? (
        <ul>
          {players.map((item, index) => (
            <li key={index}>{item.name}: Handicap {item.handicap}</li>
          ))}
        </ul>
      ) : (
        <p>No players available</p>
      )}
      <h2>Events</h2>
      {events.length > 0 ? (
        <ul>
          {events.map((item, index) => (
            <li key={index}>{item.title}: {item.date}</li>
          ))}
        </ul>
      ) : (
        <p>No events available</p>
      )}
      <h2>Weekly Results</h2>
      {weeklyResults.length > 0 ? (
        <ul>
          {weeklyResults.map((item, index) => (
            <li key={index}>Player {item.player_id}, Week {item.week}: {item.score}</li>
          ))}
        </ul>
      ) : (
        <p>No weekly results available</p>
      )}
      <h2>Scoring System</h2>
      {scoringSystem.length > 0 ? (
        <ul>
          {scoringSystem.map((item, index) => (
            <li key={index}>{item.rule_name}: {item.points} points</li>
          ))}
        </ul>
      ) : (
        <p>No scoring system available</p>
      )}
      {/* Add forms for adding players and updating scoring system as needed */}
    </div>
  );
}