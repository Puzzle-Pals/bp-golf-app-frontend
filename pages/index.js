import Link from 'next/link';

export default function Home() {
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
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', color: '#F5E8C7' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem', letterSpacing: '1px' }}>
          Welcome to the BP Men’s League!
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2.5rem', color: '#F5E8C7', maxWidth: 600 }}>
          Track player stats, check the leaderboard, and view weekly results all season long.<br />
          Use the navigation above to explore each section.
        </p>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <Link href="/player-stats" style={{ textDecoration: 'none', flex: '1 1 220px' }}>
            <div style={{
              background: '#C71585',
              color: '#F5E8C7',
              borderRadius: '0.25rem',
              padding: '2rem 1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background 0.2s, color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#87CEEB";
              e.currentTarget.style.color = "#3C2F2F";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#C71585";
              e.currentTarget.style.color = "#F5E8C7";
            }}>
              Player Stats
            </div>
          </Link>
          <Link href="/leaderboard" style={{ textDecoration: 'none', flex: '1 1 220px' }}>
            <div style={{
              background: '#C71585',
              color: '#F5E8C7',
              borderRadius: '0.25rem',
              padding: '2rem 1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background 0.2s, color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#87CEEB";
              e.currentTarget.style.color = "#3C2F2F";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#C71585";
              e.currentTarget.style.color = "#F5E8C7";
            }}>
              Leaderboard
            </div>
          </Link>
          <Link href="/weekly-results" style={{ textDecoration: 'none', flex: '1 1 220px' }}>
            <div style={{
              background: '#C71585',
              color: '#F5E8C7',
              borderRadius: '0.25rem',
              padding: '2rem 1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background 0.2s, color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = "#87CEEB";
              e.currentTarget.style.color = "#3C2F2F";
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = "#C71585";
              e.currentTarget.style.color = "#F5E8C7";
            }}>
              Weekly Results
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}