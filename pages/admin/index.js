import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLogin from "../../components/AdminLogin";

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      // NOTE: This must go to your backend API, not local /api/admin.
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api"}/admin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "checkAuth" }),
          credentials: "include",
        }
      );
      if (res.ok) {
        router.replace("/admin/dashboard");
      } else {
        setChecking(false);
      }
    })();
  }, [router]);

  if (checking) return null;
  return <AdminLogin />;
}