import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = "admin_jwt";

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(TOKEN_KEY)) {
      router.replace('/admin/events');
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Invalid password');
      const { token } = await res.json();
      localStorage.setItem(TOKEN_KEY, token);
      router.replace('/admin/events');
    } catch {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '5rem auto', padding: '2rem', background: '#1B4D3E', color: '#F5E8C7', borderRadius: 8 }}>
      <h2 style={{ marginBottom: '1rem' }}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          placeholder="Enter admin password"
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>Login</button>
      </form>
      {error && <p style={{ color: '#C71585', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}