import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = "admin_jwt";

export default function Settings() {
  const [pointsEnabled, setPointsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) {
      router.replace('/admin/admin');
      return;
    }
    fetchSettings(token);
  }, [router]);

  async function fetchSettings(token) {
    try {
      const res = await fetch('/api/admin/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setPointsEnabled(data.pointsSystemEnabled);
    } catch {
      // handle error silently
    }
  }

  async function togglePointsSystem() {
    setLoading(true);
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      router.replace('/admin/admin');
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ pointsSystemEnabled: !pointsEnabled }),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      setPointsEnabled(!pointsEnabled);
    } catch {
      alert('Error updating settings');
    }
    setLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    router.replace('/admin/admin');
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#C71585', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
          Logout
        </button>
      </div>
      <h1>Admin Settings</h1>
      <label style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <input type="checkbox" checked={pointsEnabled} onChange={togglePointsSystem} disabled={loading} style={{ marginRight: '0.5rem' }} />
        Enable Points System
      </label>
    </div>
  );
}