import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLogin from "../../components/AdminLogin";
import { getAdminToken, getProtectedAdminData, removeAdminToken } from "../../utils/api";

export default function AdminHome() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = getAdminToken();
    if (!token) {
      setChecking(false);
      setLoggedIn(false);
      return;
    }
    getProtectedAdminData(token).then((d) => {
      if (d && d.success) {
        setLoggedIn(true);
        setChecking(false);
        // If already logged in, redirect to dashboard
        router.replace("/admin/dashboard");
      } else {
        removeAdminToken();
        setLoggedIn(false);
        setChecking(false);
      }
    }).catch(() => {
      setError("Network error. Please try again.");
      setLoggedIn(false);
      setChecking(false);
    });
  }, [router]);

  if (checking) return <div>Loading...</div>;
  if (loggedIn) return null; // Redirect will have already occurred

  // Show login form if not logged in
  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Admin Login</h1>
      <AdminLogin onLogin={() => {
        // On login, redirect to dashboard
        router.replace("/admin/dashboard");
      }} />
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}