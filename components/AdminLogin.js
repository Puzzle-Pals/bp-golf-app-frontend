import React, { useState } from 'react';
import { adminLogin } from '../utils/api';

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      await adminLogin(password);
      onSuccess();
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Admin Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      </label>
      <button type="submit" className="btn btn-primary btn-sm ms-2">Login</button>
      {error && <div className="text-danger mt-2">{error}</div>}
    </form>
  );
}