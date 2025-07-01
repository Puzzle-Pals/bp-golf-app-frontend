// Use full backend URL for all fetches, not /api relative path!
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api";
const ADMIN_URL = `${API_BASE}/admin`;

// ----------- ADMIN ENDPOINTS ------------
export async function adminApi(action, data = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ action, ...data }),
    credentials: "include",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "API error");
  return json;
}

export async function adminLogin(password) {
  return adminApi("login", { password });
}

export async function adminLogout() {
  return adminApi("logout");
}

export async function sendAdminMessage({ recipientEmails, subject, message }) {
  return adminApi("sendMessage", {
    recipientEmails: Array.isArray(recipientEmails)
      ? recipientEmails
      : recipientEmails.split(",").map((e) => e.trim()),
    subject,
    message,
  });
}

export async function adminGetPlayers() { return adminApi("getPlayers"); }
export async function adminAddPlayer(player) { return adminApi("addPlayer", player); }
export async function adminUpdatePlayer(player) { return adminApi("updatePlayer", player); }
export async function adminDeletePlayer(id) { return adminApi("deletePlayer", { id }); }
export async function adminGetEvents() { return adminApi("getEvents"); }
export async function adminAddEvent(event) { return adminApi("addEvent", event); }
export async function adminUpdateEvent(event) { return adminApi("updateEvent", event); }
export async function adminDeleteEvent(id) { return adminApi("deleteEvent", { id }); }
export async function adminGetWeeklyResults() { return adminApi("getWeeklyResults"); }
export async function adminAddWeeklyResult(result) { return adminApi("addWeeklyResult", result); }
export async function adminUpdateWeeklyResult(result) { return adminApi("updateWeeklyResult", result); }
export async function adminDeleteWeeklyResult(id) { return adminApi("deleteWeeklyResult", { id }); }
export async function adminGetNews() { return adminApi("getNews"); }
export async function adminAddNews(news) { return adminApi("addNews", news); }
export async function adminUpdateNews(news) { return adminApi("updateNews", news); }
export async function adminDeleteNews(id) { return adminApi("deleteNews", { id }); }

// ----------- PUBLIC ENDPOINTS ------------
export async function apiFetch(path, { method = "GET", data } = {}) {
  const url = `${API_BASE}${path.startsWith("/") ? path : "/" + path}`;
  const headers = { "Content-Type": "application/json" };
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

export async function fetchNews() {
  return apiFetch("/news");
}