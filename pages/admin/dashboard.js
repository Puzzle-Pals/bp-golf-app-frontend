import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAdminToken, getProtectedAdminData, removeAdminToken } from "../../utils/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = getAdminToken();
    if (!token) {
      router.replace("/admin");
      return;
    }
    getProtectedAdminData(token).then((d) => {
      if (d && d.success) {
        setLoggedIn(true);
        setChecking(false);
      } else {
        removeAdminToken();
        setLoggedIn(false);
        setChecking(false);
        router.replace("/admin");
      }
    }).catch(() => {
      setError("Network error. Please try again.");
      setLoggedIn(false);
      setChecking(false);
      router.replace("/admin");
    });
  }, [router]);

  if (checking) return <div>Loading...</div>;
  if (!loggedIn) return null; // Redirecting to /admin

  // Your actual dashboard UI goes here
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32, position: "relative" }}>
      <h1>Admin Dashboard</h1>
      <button
        onClick={() => {
          removeAdminToken();
          router.replace("/admin");
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
      {/* Your dashboard content/tabs go here */}
    </div>
  );
}