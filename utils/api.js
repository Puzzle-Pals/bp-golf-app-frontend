// Next.js API route usage for Vercel
export async function apiFetch(url, options = {}) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("admin_jwt");
  }
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };
  return fetch(url, { ...options, headers });
}