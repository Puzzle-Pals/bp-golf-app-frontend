import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { adminCheckAuth, adminLogout } from "../../utils/api";
// ... import your tab components ...

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await adminCheckAuth();
        setChecking(false);
      } catch {
        router.replace("/admin");
      }
    })();
  }, [router]);

  async function handleLogout() {
    await adminLogout();
    router.replace("/admin");
  }

  if (checking) return null;

  // ...rest of your dashboard with tabs/components...
  return (
    <div>
      {/* Navigation and dashboard UI */}
      <button onClick={handleLogout}>Logout</button>
      {/* ... */}
    </div>
  );
}