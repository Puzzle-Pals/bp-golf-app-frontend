import { useEffect, useState } from "react";
import AdminLogin from "../../components/AdminLogin";

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  // Fetch protected data if logged in
  useEffect(() => {
    if (!loggedIn) return;
    const token = localStorage.getItem("token");
    fetch("/api/admin/protected", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => {
        if (d.error) {
          setError(d.error);
          setLoggedIn(false);
          localStorage.removeItem("token");
        } else {
          setData(d);
        }
      });
  }, [loggedIn]);

  if (!loggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>
        <AdminLogin onLogin={() => setLoggedIn(true)} />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    );
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <div>Loading...</div>}
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setLoggedIn(false);
          setData(null);
        }}
      >
        Logout
      </button>
    </div>
  );
}