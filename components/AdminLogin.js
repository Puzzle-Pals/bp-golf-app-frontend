import { useState } from "react";
import { adminLogin, storeAdminToken } from "../utils/api";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLogin(password);
      if (res && res.success && res.token) {
        storeAdminToken(res.token);
        setPassword("");
        if (onLogin) onLogin();
      } else {
        setError(res.error || "Invalid password, please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Admin password"
        autoFocus
        style={{ marginRight: 8 }}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !password}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}