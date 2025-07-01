import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { adminCheckAuth, adminLogout } from "../../utils/api";
// ...import your admin tab/components as needed...

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await adminCheckAuth();
        setChecking(false);
      } catch {
        router.replace("/admin");
      }
    })();
  }, [router]);

  function handleLogout() {
    adminLogout();
    router.replace("/admin");
  }

  if (checking) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/weekly-results" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Weekly Results</Link>
            <Link href="/player-stats" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Player Stats</Link>
            <Link href="/leaderboard" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Leaderboard</Link>
            <button onClick={handleLogout} style={{
              background: '#C71585',
              color: '#F5E8C7',
              border: 'none',
              borderRadius: '0.25rem',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: '1rem'
            }}>Logout</button>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', color: '#F5E8C7' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Admin Dashboard</h2>
        <div style={{
          background: '#3C2F2F',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '2rem',
          marginBottom: '2rem',
          color: '#F5E8C7'
        }}>
          {/* Render your admin dashboard content/components here */}
          {/* Example: <PlayersTab />, <EventsTab />, etc. */}
          <p>Welcome to the admin dashboard!</p>
        </div>
      </main>
    </div>
  );
}