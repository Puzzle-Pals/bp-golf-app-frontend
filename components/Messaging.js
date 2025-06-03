export default function Messaging() {
  return (
    <div style={{
      background: '#3C2F2F',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '2rem',
      margin: '2rem 0',
      color: '#F5E8C7'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Messaging</h2>
      <p style={{ marginBottom: '1.5rem' }}>
        Send announcements or messages to all players. Use this for reminders, updates, or urgent news.
      </p>
      <form>
        <textarea
          placeholder="Type your message here..."
          rows={5}
          style={{
            width: '100%',
            padding: 10,
            borderRadius: 6,
            border: '1px solid #C71585',
            background: '#1B4D3E',
            color: '#F5E8C7',
            marginBottom: 16,
            resize: 'vertical'
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
          Send Message
        </button>
      </form>
    </div>
  );
}