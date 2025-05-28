import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = "admin_jwt";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check for JWT and redirect if not authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) {
      router.replace('/admin/admin'); // or '/admin' if that's your login page
      return;
    }
    fetchPlayers(token);
  }, [router]);

  async function fetchPlayers(token) {
    try {
      const res = await fetch('/api/admin/players', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch players');
      const data = await res.json();
      setPlayers(data.players || data);
    } catch (err) {
      setError('Failed to fetch players');
    }
  }

  async function addPlayer() {
    if (!name.trim()) return alert('Name is required');
    setLoading(true);
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace('/admin/admin');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/players', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error('Failed to add player');
      setName('');
      setEmail('');
      fetchPlayers(token);
    } catch {
      alert('Error adding player');
    }
    setLoading(false);
  }

  async function uploadCsv() {
    if (!csvFile) return alert('Please select a CSV file');
    setLoading(true);
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace('/admin/admin');
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const res = await fetch('/api/admin/players/upload-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error('CSV upload failed');
      setCsvFile(null);
      fetchPlayers(token);
    } catch {
      alert('Error uploading CSV');
    }
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    router.replace('/admin/admin');
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#C71585', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
          Logout
        </button>
      </div>
      <h1>Players</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '0.5rem', width: '45%', marginRight: '1rem' }}
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', width: '45%' }}
        />
      </div>
      <button onClick={addPlayer} disabled={loading} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
        Add Player
      </button>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setCsvFile(e.target.files[0])}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={uploadCsv} disabled={loading || !csvFile} style={{ padding: '0.5rem 1rem' }}>
        Upload CSV
      </button>

      <h2 style={{ marginTop: '2rem' }}>Current Players</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {players.map((p) => (
          <li key={p._id || p.id}>
            {p.name} {p.email ? `(${p.email})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}