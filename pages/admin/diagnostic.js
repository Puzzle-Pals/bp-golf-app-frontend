import Link from "next/link";

export default function AdminDiagnostic() {
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
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{
          background: '#3C2F2F',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '2rem',
          margin: '0 auto',
          maxWidth: 800,
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Diagnostic Tools</h2>
          <p>Run diagnostic checks on the system here. (Add your tools/components below.)</p>
        </div>
      </main>
    </div>
  );
}