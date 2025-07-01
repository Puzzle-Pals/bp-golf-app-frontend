import { useState } from "react";
import { useRouter } from "next/router";
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
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-green-900">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Admin Password"
          autoFocus
        />
        <button type="submit" className="btn btn-primary w-full mb-2">Login</button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
    </div>
  );
}