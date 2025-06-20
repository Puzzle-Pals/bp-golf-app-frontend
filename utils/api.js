// Use the relative path that will be handled by your vercel.json rewrite
const ADMIN_URL = "/api/admin";

export async function adminApi(action, data = {}) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ action, ...data }),
    credentials: "include" // Important for cookies/sessions
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "API error");
  return json;
}

export async function adminLogin(password) {
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "login", password }),
    credentials: "include" // Important for cookies/sessions
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function adminLogout() {
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "logout" }),
    credentials: "include" // Important for cookies/sessions
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Logout failed");
  return data;
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