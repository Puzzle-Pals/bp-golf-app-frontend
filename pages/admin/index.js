import { useEffect } from "react";
import { useRouter } from "next/router";
import AdminLogin from '../../components/AdminLogin';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("bp_admin_token");
      if (token) {
        try {
          const [, payload] = token.split(".");
          if (payload) {
            const decoded = JSON.parse(atob(payload));
            if (decoded.admin && (!decoded.exp || Date.now() / 1000 < decoded.exp)) {
              router.replace("/admin/dashboard");
            }
          }
        } catch { /* ignore */ }
      }
    }
  }, [router]);

  return <AdminLogin />;
}