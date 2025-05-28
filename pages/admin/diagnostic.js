import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = "admin_jwt";

export default function Diagnostic() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin login if not authenticated
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) {
      router.replace('/admin/admin'); // or '/admin' if that's your login page
      return;
    }

    const fetchData = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await axios.get(
          `${API_BASE_URL}/api/admin/diagnostic`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch diagnostic data, using mock data');
        console.error('Fetch error:', err.message);
        // Mock data for testing
        setData({ diagnostics: [] });
        // Optionally, redirect if unauthorized
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem(TOKEN_KEY);
          router.replace('/admin/admin');
        }
      }
    };
    fetchData();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    router.replace('/admin/admin');
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#C71585', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
          Logout
        </button>
      </div>
      <h1>Diagnostic Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading diagnostic data...</p>
      )}
    </div>
  );
}