import { useState } from "react";
import { adminLogin, storeAdminToken } from "../utils/api";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await adminLogin(password);
      if (res && res.success && res.token) {
        storeAdminToken(res.token);
        setPassword("");
        if (onLogin) onLogin(); // Notify parent (dashboard) to update state
      } else {
        setError(res.error || "Invalid password, please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Admin Password:
        <input
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", margin: "8px 0" }}
        />
      </label>
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
}