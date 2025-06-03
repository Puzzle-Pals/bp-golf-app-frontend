const API_BASE = "/api";
const ADMIN_API_BASE = "/api/admin";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

export async function apiFetch(path, { method = "GET", data, admin = false } = {}) {
  const url = (admin ? ADMIN_API_BASE : API_BASE) + path;
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (admin && token) headers["Authorization"] = `Bearer ${token}`;

  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);

  const res = await fetch(url, options);
  if (!res.ok) {
    let errorMsg = "API Error";
    try {
      errorMsg = (await res.json()).error || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }
  return await res.json();
}

// Admin Auth
export async function adminLogin(password) {
  const res = await apiFetch("/login", { method: "POST", data: { password }, admin: true });
  if (typeof window !== "undefined") localStorage.setItem("adminToken", res.token);
  return res;
}

// Messaging
export async function sendAdminMessage({ recipientEmails, subject, message }) {
  return apiFetch("/messaging", {
    method: "POST",
    data: {
      recipientEmails: Array.isArray(recipientEmails)
        ? recipientEmails
        : recipientEmails.split(",").map((e) => e.trim()),
      subject,
      message,
    },
    admin: true,
  });
}

// Admin CRUD (repeat for other admin resources as needed)
export async function adminGetPlayers() {
  return apiFetch("/players", { admin: true });
}
export async function adminAddPlayer(player) {
  return apiFetch("/players", { method: "POST", data: player, admin: true });
}
export async function adminUpdatePlayer(player) {
  return apiFetch("/players", { method: "PUT", data: player, admin: true });
}
export async function adminDeletePlayer(id) {
  return apiFetch(`/players?id=${id}`, { method: "DELETE", admin: true });
}

// ----------- PUBLIC ENDPOINTS ------------
export async function fetchLeaderboard() {
  return apiFetch("/leaderboard");
}
export async function fetchPlayers() {
  return apiFetch("/players");
}
export async function fetchEvents() {
  return apiFetch("/events");
}
export async function fetchWeeklyResults() {
  return apiFetch("/weekly_results");
}