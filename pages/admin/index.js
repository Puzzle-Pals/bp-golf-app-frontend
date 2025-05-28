import { useState } from 'react';
import { useRouter } from 'next/router';
import { adminLogin, storeAdminToken, getAdminToken } from '../../utils/api';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // If already logged in, redirect to dashboard
  if (typeof window !== "undefined" && getAdminToken()) {
    router.replace('/admin/dashboard');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await adminLogin(password);
    if (res.success && res.token) {
      storeAdminToken(res.token);
      router.push('/admin/dashboard');
    } else {
      setError(res.error || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2em auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', margin: '8px 0' }}
          />
        </label>
        <button type="submit" style={{ width: '100%' }}>Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}