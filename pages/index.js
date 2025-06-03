import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5E8C7', padding: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <h1 style={{ color: '#1B4D3E', marginBottom: '1rem' }}>BP Men’s League</h1>
        <p>Welcome to the league app! Please use the navigation to access scores and admin features.</p>
        <Link href="/admin/dashboard" style={{ color: '#C71585', fontWeight: 'bold', textDecoration: 'underline' }}>
          Go to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}