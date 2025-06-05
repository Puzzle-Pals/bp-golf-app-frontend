import { useState } from "react";

export default function PlayerForm({ onSubmit }) {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm({ first_name: "", last_name: "", email: "" });
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16, marginBottom: 16 }}>
      <input
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        required
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        type="email"
      />
      <button type="submit">Add Player</button>
    </form>
  );
}