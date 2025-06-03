export default function WeeklyResultsManagement() {
  return (
    <div style={{
      background: '#3C2F2F',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '2rem',
      margin: '2rem 0',
      color: '#F5E8C7'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Weekly Results Management</h2>
      <p style={{ marginBottom: '1.5rem', color: '#F5E8C7' }}>
        Enter or update results for each week. Results drive the leaderboard and payouts.
      </p>
      {/* Example table */}
      <table style={{ width: '100%', background: '#1B4D3E', color: '#F5E8C7', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
        <thead>
          <tr>
            <th style={{ padding: 8, borderBottom: '1px solid #C71585', textAlign: 'left' }}>Week</th>
            <th style={{ padding: 8, borderBottom: '1px solid #C71585', textAlign: 'left' }}>Winner</th>
            <th style={{ padding: 8, borderBottom: '1px solid #C71585', textAlign: 'left' }}>Score</th>
            <th style={{ padding: 8, borderBottom: '1px solid #C71585', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8 }}>Week 1</td>
            <td style={{ padding: 8 }}>John Doe</td>
            <td style={{ padding: 8 }}>34</td>
            <td style={{ padding: 8 }}>
              <button style={{
                background: '#C71585',
                color: '#F5E8C7',
                border: 'none',
                borderRadius: 4,
                padding: '0.3rem 0.8rem',
                marginRight: 8,
                cursor: 'pointer'
              }}>Edit</button>
              <button style={{
                background: '#F5E8C7',
                color: '#C71585',
                border: 'none',
                borderRadius: 4,
                padding: '0.3rem 0.8rem',
                cursor: 'pointer'
              }}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button style={{
        background: '#C71585',
        color: '#F5E8C7',
        border: 'none',
        borderRadius: 4,
        padding: '0.5rem 1.2rem',
        fontWeight: 'bold',
        fontSize: '1rem',
        cursor: 'pointer'
      }}>Add Weekly Result</button>
    </div>
  );
}