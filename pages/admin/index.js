import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { adminLogin } from "../../utils/api";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      await adminLogin(password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Invalid password");
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1B4D3E', color: '#F5E8C7' }}>
      <nav style={{ backgroundColor: '#3C2F2F', padding: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ color: '#F5E8C7', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
            BP Men’s League
          </Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/weekly-results" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Weekly Results</Link>
            <Link href="/player-stats" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Player Stats</Link>
            <Link href="/leaderboard" style={{ color: '#F5E8C7', textDecoration: 'none' }}>Leaderboard</Link>
          </div>
        </div>
      </nav>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem', color: '#F5E8C7', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleLogin} style={{
          background: '#3C2F2F',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: '2rem',
          maxWidth: 400,
          width: '100%',
          color: '#F5E8C7'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '0.75rem',
              borderRadius: '0.25rem',
              border: '1px solid #ccc',
              fontSize: '1rem',
              background: '#DDE5E0',
              color: '#1B4D3E'
            }}
          />
          <button type="submit" style={{
            width: '100%',
            padding: '0.75rem',
            background: '#1B4D3E',
            color: '#F5E8C7',
            border: 'none',
            borderRadius: '0.25rem',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer'
          }}>
            Login
          </button>
          {error && <div style={{ color: '#C71585', marginTop: '1rem' }}>{error}</div>}
        </form>
      </main>
    </div>
  );
}