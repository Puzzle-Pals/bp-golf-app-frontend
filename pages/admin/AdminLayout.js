import Link from "next/link";
export default function AdminLayout({ children, showLogout = false, onLogout }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League
          </Link>
          {showLogout && (
            <button onClick={onLogout} style={{
              background: '#C71585',
              color: '#F5E8C7',
              border: 'none',
              borderRadius: '0.25rem',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}>Logout</button>
          )}
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', color: '#F5E8C7' }}>
        {children}
      </main>
    </div>
  );
}