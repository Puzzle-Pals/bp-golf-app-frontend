export default function WeeklyRoundManagement() {
  return (
    <div style={{
      background: '#3C2F2F',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '2rem',
      margin: '2rem 0',
      color: '#F5E8C7'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Weekly Round Management</h2>
      <p style={{ marginBottom: '1.5rem', color: '#F5E8C7' }}>
        Manage the details of each week’s round, such as course, tee time, and other notes.
      </p>
      {/* Example form */}
      <form>
        <input
          type="text"
          placeholder="Course Name"
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
        <input
          type="text"
          placeholder="Tee Time"
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
          placeholder="Notes..."
          rows={3}
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
          Save Round
        </button>
      </form>
    </div>
  );
}