const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchPlayers = async () => {
  const res = await fetch(`${API_URL}/api/players`);
  if (!res.ok) throw new Error('Failed to fetch players');
  return res.json();
};

export const addPlayer = async (playerData) => {
  const res = await fetch(`${API_URL}/api/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to add player');
  }
  return res.json();
};

export const fetchWeeklyResults = async () => {
  const res = await fetch(`${API_URL}/api/weekly-results`);
  if (!res.ok) throw new Error('Failed to fetch weekly results');
  return res.json();
};

export const fetchPlayerStats = async () => {
  const res = await fetch(`${API_URL}/api/player-stats`);
  if (!res.ok) throw new Error('Failed to fetch player stats');
  return res.json();
};

export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_URL}/api/leaderboard`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
};
