import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLogin from "../../components/AdminLogin";
import { getAdminToken, getProtectedAdminData, removeAdminToken } from "../../utils/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Only check token client side
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = getAdminToken();
    if (!token) {
      setLoggedIn(false);
      setChecking(false);
      return;
    }
    getProtectedAdminData().then((d) => {
      if (d && !d.error) {
        setLoggedIn(true);
        setChecking(false);
      } else {
        setError(d.error || "Session expired. Please log in again.");
        removeAdminToken();
        setLoggedIn(false);
        setChecking(false);
      }
    });
  }, []);

  if (checking) return <div>Loading...</div>;

  if (!loggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: "40px auto" }}>
        <h1>Admin Login</h1>
        <AdminLogin onLogin={() => {
          setLoggedIn(true);
          setError("");
        }} />
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </div>
    );
  }

  // Your real dashboard below this line
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => {
          removeAdminToken();
          setLoggedIn(false);
          setError("");
        }}
        style={{
          background: "#f55",
          color: "white",
          borderRadius: 4,
          padding: "8px 16px",
          border: "none",
          cursor: "pointer",
          position: "absolute",
          right: 32,
          top: 32
        }}
      >
        Logout
      </button>
      {/* Your tabs and dashboard goes here */}
    </div>
  );
}