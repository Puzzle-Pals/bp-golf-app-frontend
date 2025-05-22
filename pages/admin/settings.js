// pages/admin/settings.js

import { useState, useEffect } from 'react';

export default function Settings() {
  const [pointsEnabled, setPointsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current settings from API
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        setPointsEnabled(data.pointsSystemEnabled);
      } catch {
        // handle error silently
      }
    }
    fetchSettings();
  }, []);

  async function togglePointsSystem() {
    setLoading(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pointsSystemEnabled: !pointsEnabled }),
      });
      if (!res.ok) throw new Error('Failed to update settings');
      setPointsEnabled(!pointsEnabled);
    } catch {
      alert('Error updating settings');
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Admin Settings</h1>
      <label style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
        <input
          type="checkbox"
          checked={pointsEnabled}
          onChange={togglePointsSystem}
          disabled={loading}
          style={{ marginRight: '0.5rem' }}
        />
        Enable Points System
      </label>
    </div>
  );
}
