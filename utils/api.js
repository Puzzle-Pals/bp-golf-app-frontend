const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api";
const ADMIN_URL = `${API_BASE}/admin`;

export async function adminApi(action, data = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ action, ...data }),
    credentials: "include"
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "API error");
  return json;
}

export async function adminLogin(password) {
  // On success, cookie is set automatically
  return adminApi("login", { password });
}

export async function adminLogout() {
  return adminApi("logout");
}

export async function adminCheckAuth() {
  return adminApi("checkAuth");
}

// ...other admin functions...

export async function fetchNews() {
  return apiFetch("/news");
}

export async function apiFetch(path, { method = "GET", data } = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : "/" + path}`;
  const headers = { "Content-Type": "application/json" };
  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(url, options);
  if (!res.ok) {
    let errorMsg = "API Error";
    try { errorMsg = (await res.json()).error || errorMsg; } catch {}
    throw new Error(errorMsg);
  }
  return await res.json();
}