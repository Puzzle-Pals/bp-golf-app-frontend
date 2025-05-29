import { useState } from "react";

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
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          maxWidth: 320,
          width: "100%",
          background: "#f9f9f9",
          borderRadius: 8,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: 32
        }}
      >
        <h2 style={{ textAlign: "center", margin: 0 }}>Admin Login</h2>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          disabled={loading}
          style={{ padding: 10, fontSize: 16, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          disabled={loading || !password}
          style={{
            padding: 10,
            fontSize: 16,
            borderRadius: 4,
            background: "#1B4D3E",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
      </form>
    </div>
  );
}