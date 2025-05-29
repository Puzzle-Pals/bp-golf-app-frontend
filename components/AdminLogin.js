import { useState } from "react";

// Directly call backend endpoint, don't rely on utils/api.js for admin login!
const BACKEND_URL = "https://bp-golf-app-backend.vercel.app";
const TOKEN_KEY = "admin_jwt";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
        setPassword("");
        if (onLogin) onLogin(data.token);
      } else {
        setError(data.error || "Invalid password, please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Admin password"
        autoFocus
        disabled={loading}
        style={{ padding: 8, fontSize: 16 }}
      />
      <button type="submit" disabled={loading || !password} style={{ padding: 8, fontSize: 16 }}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}