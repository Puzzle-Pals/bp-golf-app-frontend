import { useState } from "react";

export default function PlayerForm({ onSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    setError("");
    onSubmit({ first_name: firstName, last_name: lastName, email });
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      <div style={{ marginBottom: 8 }}>
        <input
          type="text"
          placeholder="First Name*"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          style={{ marginRight: 8 }}
        />
        <input
          type="text"
          placeholder="Last Name*"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: 8 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Add Player</button>
    </form>
  );
}