import { useState } from 'react';

export default function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || 'Login failed');
      }
      // handle successful login, e.g., redirect or set auth state
      window.location.href = '/admin/dashboard';
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', background: '#F5E8C7', borderRadius: '0.5rem' }}>
      <h2 style={{ color: '#3C2F2F', fontWeight: 'bold', marginBottom: '1rem' }}>Admin Login</h2>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ color: '#3C2F2F', display: 'block' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #3C2F2F' }}
            autoComplete="username"
          />
        </div>
        <div>
          <label style={{ color: '#3C2F2F', display: 'block' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #3C2F2F' }}
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: '#C71585',
            color: '#F5E8C7',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            transition: 'background-color 0.2s, color 0.2s'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}