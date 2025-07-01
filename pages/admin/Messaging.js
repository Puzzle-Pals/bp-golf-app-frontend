import { useState } from "react";
export default function AdminMessaging() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  function handleSend(e) {
    e.preventDefault();
    setStatus(null);
    fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then(r => r.json())
      .then(() => {
        setStatus("Message sent!");
        setMessage("");
      })
      .catch(() => setStatus("Failed to send message"));
  }

  return (
    <div>
      <h2>Messaging</h2>
      {status && <div style={{ color: status.startsWith("Failed") ? "#C71585" : "#4BB543" }}>{status}</div>}
      <form onSubmit={handleSend} style={{ marginTop: 16, marginBottom: 16 }}>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message here..."
          rows={4}
          style={{ width: "100%" }}
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}