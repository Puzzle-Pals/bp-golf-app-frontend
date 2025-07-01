import { useEffect } from "react";
import Router from "next/router";

// Utility to check if admin JWT is valid (localStorage key: bp_admin_token)
function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  const token = window.localStorage.getItem("bp_admin_token");
  if (!token) return false;
  try {
    const [, payload] = token.split(".");
    if (!payload) return false;
    const decoded = JSON.parse(atob(payload));
    if (!decoded.admin) return false;
    // Expiry check (exp in seconds)
    if (decoded.exp && Date.now() / 1000 > decoded.exp) {
      window.localStorage.removeItem("bp_admin_token");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// Route guard for all /admin pages
function AdminGuard({ children }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location.pathname.startsWith("/admin") &&
      window.location.pathname !== "/admin" // allow login page
    ) {
      if (!isAdminAuthenticated()) {
        Router.replace("/admin"); // Redirect to login if not authenticated
      }
    }
  }, []);
  return children;
}

export default function App({ Component, pageProps }) {
  // Wrap all pages with AdminGuard so /admin/* is protected
  return (
    <AdminGuard>
      <Component {...pageProps} />
    </AdminGuard>
  );
}