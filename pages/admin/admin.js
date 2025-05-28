import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Utility to get/set/remove JWT from localStorage
const TOKEN_KEY = 'admin_jwt';
const getToken = () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export default function Admin() {
  const [players, setPlayers] = useState([]);
  const [events, setEvents] = useState([]);
  const [weeklyResults, setWeeklyResults] = useState([]);
  const [scoringSystem, setScoringSystem] = useState([]);
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(!!getToken());
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Fetch admin data if authenticated
  useEffect(() => {
    if (!isAuth) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const jwt = getToken();
        const config = { headers: { Authorization: `Bearer ${jwt}` } };
        const [playersResponse, eventsResponse, resultsResponse, scoringResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/admin/players`, config),
          axios.get(`${API_BASE_URL}/api/admin/events`, config),
          axios.get(`${API_BASE_URL}/api/admin/weekly_results`, config),
          axios.get(`${API_BASE_URL}/api/admin/scoring_system`, config),
        ]);
        setPlayers(playersResponse.data.players || playersResponse.data || []);
        setEvents(eventsResponse.data.events || eventsResponse.data || []);
        setWeeklyResults(resultsResponse.data.weekly_results || resultsResponse.data || []);
        setScoringSystem(scoringResponse.data.scoring_system || scoringResponse.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to fetch admin data, please re-login.');
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          handleLogout();
        }
        // Optionally: setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isAuth]);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const username = e.target.username.value;
    const password = e.target.password.value;
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
      setToken(response.data.token);
      setIsAuth(true);
    } catch (err) {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    removeToken();
    setIsAuth(false);
    setPlayers([]);
    setEvents([]);
    setWeeklyResults([]);
    setScoringSystem([]);
  };

  // Example: Add Player (must send JWT)
  const handleAddPlayer = async (name, handicap) => {
    try {
      const jwt = getToken();
      await axios.post(
        `${API_BASE_URL}/api/admin/players`,
        { name, handicap },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      router.reload();
    } catch (err) {
      setError('Failed to add player');
    }
  };

  // Example: Update Scoring System (must send JWT)
  const handleUpdateScoring = async (id, rule_name, points) => {
    try {
      const jwt = getToken();
      await axios.put(
        `${API_BASE_URL}/api/admin/scoring_system`,
        { id, rule_name, points },
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      router.reload();
    } catch (err) {
      setError('Failed to update scoring system');
    }
  };

  // ----------- RENDER ---------------
  if (!isAuth) {
    return (
      <div>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input name="username" required autoComplete="username" />
          </label>
          <br />
          <label>
            Password:
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      </div>
    );
  }

  return (
    <div>
      <button style={{ float: 'right' }} onClick={handleLogout}>Logout</button>
      <h1>Admin Panel</h1>
      {loading ? <p>Loading...</p> : null}
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
      {/* Add forms for adding players and updating scoring system as needed, using handleAddPlayer and handleUpdateScoring */}
    </div>
  );
}