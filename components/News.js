export default function News() {
  return (
    <div style={{
      background: '#3C2F2F',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '2rem',
      margin: '2rem 0',
      color: '#F5E8C7'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>League News</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        Add, edit, or remove news and updates for the league homepage.
      </p>
      <form>
        <input
          type="text"
          placeholder="Headline"
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 6,
            border: '1px solid #C71585',
            background: '#1B4D3E',
            color: '#F5E8C7',
            marginBottom: 10
          }}
        />
        <textarea
          placeholder="News details..."
          rows={4}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 6,
            border: '1px solid #C71585',
            background: '#1B4D3E',
            color: '#F5E8C7',
            marginBottom: 16
          }}
        />
        <button type="submit" style={{
          background: '#C71585',
          color: '#F5E8C7',
          border: 'none',
          borderRadius: 4,
          padding: '0.5rem 1.2rem',
          fontWeight: 'bold',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          Add News
        </button>
      </form>
      {/* Example: existing news items */}
      <div style={{ marginTop: 24 }}>
        <div style={{
          background: '#1B4D3E',
          borderRadius: 4,
          padding: 12,
          marginBottom: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#87CEEB' }}>2025-05-30</div>
            <div>Great start to the season! See leaderboard for results.</div>
          </div>
          <button style={{
            background: '#C71585',
            color: '#F5E8C7',
            border: 'none',
            borderRadius: 4,
            padding: '0.3rem 0.8rem',
            cursor: 'pointer'
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}