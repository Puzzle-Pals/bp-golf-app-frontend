// Redirect to dashboard or login depending on auth state
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_jwt") : null;
    if (token) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return null;
}