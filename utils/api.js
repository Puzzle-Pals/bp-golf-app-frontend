// This is a fetch utility that automatically adds the JWT token to admin requests,
// and uses the backend API base URL for all API calls in production.

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "https://bp-golf-app-backend-puzzle-pals-projects.vercel.app"; // Use your deployed backend URL

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
  // Always use the backend API base URL for API calls
  return fetch(`${API_BASE}${url}`, { ...options, headers });
}