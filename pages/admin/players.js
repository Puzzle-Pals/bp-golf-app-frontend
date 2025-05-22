// pages/admin/players.js

import { useState, useEffect } from 'react';

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    try {
      const res = await fetch('/api/players');
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      setError('Failed to fetch players');
    }
  }

  async function addPlayer() {
    if (!name.trim()) return alert('Name is required');
    setLoading(true);
    try {
      const res = await fetch('/api/players', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) throw new Error('Failed to add player');
      setName('');
      setEmail('');
      fetchPlayers();
    } catch {
      alert('Error adding player');
    }
    setLoading(false);
  }

  async function uploadCsv() {
    if (!csvFile) return alert('Please select a CSV file');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const res = await fetch('/api/players/upload-csv', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('CSV upload failed');
      setCsvFile(null);
      fetchPlayers();
    } catch {
      alert('Error uploading CSV');
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '0 1rem' }}>
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
          <li key={p._id}>
            {p.name} {p.email ? `(${p.email})` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}
