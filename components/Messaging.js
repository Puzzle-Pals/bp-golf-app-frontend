import { useState } from 'react';

export default function Messaging() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messaging`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      setMessage('');
      setSuccess('Message sent!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3C2F2F' }}>Send Message</h2>
      {error && <p style={{ color: '#C71585' }}>{error}</p>}
      {success && <p style={{ color: '#1B4D3E' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', color: '#3C2F2F' }}>Message (will be emailed to all players)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #3C2F2F', borderRadius: '0.25rem', minHeight: '100px' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ backgroundColor: '#C71585', color: '#F5E8C7', padding: '0.5rem 1rem', borderRadius: '0.25rem', transition: 'background-color 0.2s, color 0.2s' }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}