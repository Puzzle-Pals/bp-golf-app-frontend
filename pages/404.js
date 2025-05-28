import Link from 'next/link';

export default function Custom404() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1B4D3E', color: '#F5E8C7' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
      <Link href="/" style={{ color: '#C71585', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'underline' }}>
        Go Home
      </Link>
    </div>
  );
}