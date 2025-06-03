import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League (Admin)
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/admin/dashboard" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Dashboard</Link>
            <Link href="/admin/players" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Players</Link>
            <Link href="/admin/events" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Events</Link>
            <Link href="/admin/add-week" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Add Week</Link>
            <Link href="/admin/settings" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Settings</Link>
            <Link href="/" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Logout</Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', color: '#F5E8C7' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem', letterSpacing: '1px' }}>
          Admin Dashboard
        </h1>
        <div style={{
          background: '#3C2F2F',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '2rem',
          margin: '0 auto',
          maxWidth: 800,
        }}>
          <p style={{ color: '#F5E8C7', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            Welcome, Admin! Use the links above to manage league data, players, events, and news.
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link href="/admin/players" style={{ textDecoration: 'none', flex: '1 1 200px' }}>
              <div style={{
                background: '#C71585',
                color: '#F5E8C7',
                borderRadius: '0.25rem',
                padding: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '1.15rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer'
              }}>
                Manage Players
              </div>
            </Link>
            <Link href="/admin/events" style={{ textDecoration: 'none', flex: '1 1 200px' }}>
              <div style={{
                background: '#C71585',
                color: '#F5E8C7',
                borderRadius: '0.25rem',
                padding: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '1.15rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer'
              }}>
                Manage Events
              </div>
            </Link>
            <Link href="/admin/add-week" style={{ textDecoration: 'none', flex: '1 1 200px' }}>
              <div style={{
                background: '#C71585',
                color: '#F5E8C7',
                borderRadius: '0.25rem',
                padding: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '1.15rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer'
              }}>
                Add Weekly Results
              </div>
            </Link>
            <Link href="/admin/settings" style={{ textDecoration: 'none', flex: '1 1 200px' }}>
              <div style={{
                background: '#C71585',
                color: '#F5E8C7',
                borderRadius: '0.25rem',
                padding: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '1.15rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'background 0.2s, color 0.2s',
                cursor: 'pointer'
              }}>
                League Settings
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}