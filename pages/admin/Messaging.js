// pages/admin/messaging.js

import { useState } from 'react';

export default function Messaging() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  async function sendMessage() {
    if (!subject || !message) {
      alert('Subject and message are required');
      return;
    }
    setSending(true);

    try {
      const res = await fetch('/api/messaging/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      alert('Message sent successfully');
      setSubject('');
      setMessage('');
    } catch {
      alert('Error sending message');
    }
    setSending(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Send Message to All Players</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Subject:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Message:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>
      </div>
      <button onClick={sendMessage} disabled={sending} style={{ padding: '0.5rem 1rem' }}>
        Send
      </button>
    </div>
  );
}
