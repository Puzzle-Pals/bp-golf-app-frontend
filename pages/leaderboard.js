import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [scoringSystem, setScoringSystem] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const [leaderboardResponse, scoringResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/leaderboard`),
          axios.get(`${API_BASE_URL}/api/scoring_system`),
        ]);
        setLeaderboard(leaderboardResponse.data.leaderboard || []);
        setScoringSystem(scoringResponse.data.scoring_system || []);
      } catch (err) {
        setError('Failed to fetch leaderboard data, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        // setLeaderboard([
        //   { id: 1, player_id: 1, total_points: 100 },
        //   { id: 2, player_id: 2, total_points: 90 },
        // ]);
        // setScoringSystem([
        //   { id: 1, rule_name: 'Birdie', points: 3 },
        //   { id: 2, rule_name: 'Par', points: 1 },
        // ]);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {leaderboard.length > 0 ? (
        <ul>
          {leaderboard.map((item, index) => (
            <li key={index}>Player {item.player_id}: {item.total_points} points</li>
          ))}
        </ul>
      ) : (
        <p>No leaderboard data available</p>
      )}
      <h2>Scoring System</h2>
      {scoringSystem.length > 0 ? (
        <ul>
          {scoringSystem.map((item, index) => (
            <li key={index}>{item.rule_name}: {item.points} points</li>
          ))}
        </ul>
      ) : (
        <p>No scoring system data available</p>
      )}
    </div>
  );
}