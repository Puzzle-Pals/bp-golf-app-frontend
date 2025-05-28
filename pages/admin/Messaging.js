import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TOKEN_KEY = "admin_jwt";

export default function Messaging() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const router = useRouter();

  // Redirect to admin login if not authenticated
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!token) {
      router.replace('/admin/admin'); // or '/admin' if that's your login page
    }
  }, [router]);

  async function sendMessage() {
    if (!subject || !message) {
      alert('Subject and message are required');
      return;
    }
    setSending(true);

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setSending(false);
      router.replace('/admin/admin');
      return;
    }

    try {
      const res = await fetch('/api/admin/messaging/send', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    router.replace('/admin/admin');
  }

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: '#C71585', color: '#fff', border: 'none', borderRadius: '0.25rem' }}>
          Logout
        </button>
      </div>
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