import React, { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api';

export default function ScoringSystemToggle() {
  const [enabled, setEnabled] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const settings = await apiFetch('/settings', { admin: true });
      setEnabled(!!settings.pointsSystemEnabled);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle() {
    try {
      await apiFetch('/settings', {
        method: 'PUT',
        data: { pointsSystemEnabled: !enabled },
        admin: true,
      });
      setEnabled((v) => !v);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mb-4">
      <h3>Scoring System</h3>
      <p>Points system is <strong>{enabled ? "Enabled" : "Disabled"}</strong></p>
      <button className="btn btn-sm btn-warning" onClick={handleToggle}>
        {enabled ? "Disable" : "Enable"} Points System
      </button>
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
}