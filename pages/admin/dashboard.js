import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "./AdminLayout";
import ErrorBoundary from "./ErrorBoundary";
import { adminCheckAuth, adminLogout } from "../../utils/api";

// Import each tab component (all made bulletproof below)
import PlayersAdmin from "./players";
import AdminEvents from "./events";
import AddWeekAdmin from "./add-week";
import AdminSettings from "./settings";
import AdminMessaging from "./Messaging";

const TABS = [
  { label: "Players", key: "players", Component: PlayersAdmin },
  { label: "Events", key: "events", Component: AdminEvents },
  { label: "Add Week", key: "add-week", Component: AddWeekAdmin },
  { label: "Settings", key: "settings", Component: AdminSettings },
  { label: "Messaging", key: "messaging", Component: AdminMessaging },
  // Diagnostic tab removed as requested
];

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState("players");
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

  function handleLogout() {
    adminLogout();
    router.replace("/admin");
  }

  if (checking) return null;

  const CurrentComponent = TABS.find(t => t.key === tab)?.Component || (() => <div>Tab not found</div>);

  return (
    <AdminLayout showLogout onLogout={handleLogout}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Admin Dashboard</h2>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '3px solid #3C2F2F'
      }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderBottom: t.key === tab ? '4px solid #87CEEB' : '4px solid transparent',
              background: 'none',
              color: '#F5E8C7',
              fontSize: '1rem',
              fontWeight: t.key === tab ? 'bold' : 'normal',
              cursor: 'pointer',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{
        background: '#3C2F2F',
        borderRadius: '1rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        padding: '2rem',
        margin: '0 auto 2rem auto',
        color: '#F5E8C7',
        maxWidth: 900,
        minHeight: 300,
        border: '2px solid #87CEEB'
      }}>
        <ErrorBoundary>
          <CurrentComponent />
        </ErrorBoundary>
      </div>
    </AdminLayout>
  );
}