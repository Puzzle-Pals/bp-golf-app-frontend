// This is a fetch utility that automatically adds the JWT token to admin requests.

export async function apiFetch(url, options = {}) {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem('admin_jwt');
  }
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
}