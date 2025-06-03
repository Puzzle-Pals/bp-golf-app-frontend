import React, { useState } from 'react';
import { adminApi } from '../utils/api';

export default function Messaging() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSend = async e => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await adminApi('sendMessage', {
        recipientEmails: recipients.split(',').map(e => e.trim()),
        subject,
        message
      });
      setStatus('Message sent!');
      setRecipients('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setStatus('Failed: ' + err.message);
    }
  };

  return (
    <div className="mb-4">
      <h3>Messaging</h3>
      <form onSubmit={handleSend}>
        <div className="mb-2">
          <label>Recipients (comma separated):</label>
          <input className="form-control" value={recipients} onChange={e => setRecipients(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Subject:</label>
          <input className="form-control" value={subject} onChange={e => setSubject(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Message:</label>
          <textarea className="form-control" value={message} onChange={e => setMessage(e.target.value)} required />
        </div>
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
      <div>{status}</div>
    </div>
  );
}