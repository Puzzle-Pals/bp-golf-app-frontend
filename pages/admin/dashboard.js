import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiFetch } from "../../utils/api";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_jwt") : null;
    if (!token) {
      router.push("/admin/login");
      return;
    }
    (async () => {
      try {
        const res = await apiFetch("/api/admin/protected");
        if (res.status === 401) {
          setError("Session expired. Please log in again.");
          localStorage.removeItem("admin_jwt");
          setTimeout(() => router.push("/admin/login"), 1500);
        } else {
          const data = await res.json();
          setAdminData(data);
        }
      } catch {
        setError("Failed to fetch admin data.");
      }
    })();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_jwt");
    router.push("/admin/login");
  };

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      <div style={{ marginTop: 24 }}>
        <pre>{adminData ? JSON.stringify(adminData, null, 2) : "Loading..."}</pre>
      </div>
    </div>
  );
}