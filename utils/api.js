const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://bp-golf-app-backend.vercel.app/api";
const ADMIN_URL = `${API_BASE}/admin`;

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("adminToken");
}

export async function adminApi(action, data = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(ADMIN_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ action, ...data }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "API error");
  return json;
}

export async function adminLogin(password) {
  const res = await adminApi("login", { password });
  if (typeof window !== "undefined") localStorage.setItem("adminToken", res.token);
  return res;
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

export async function adminGetPlayers() {
  return adminApi("getPlayers");
}
export async function adminAddPlayer(player) {
  return adminApi("addPlayer", player);
}
export async function adminUpdatePlayer(player) {
  return adminApi("updatePlayer", player);
}
export async function adminDeletePlayer(id) {
  return adminApi("deletePlayer", { id });
}

export async function adminGetEvents() {
  return adminApi("getEvents");
}
export async function adminAddEvent(event) {
  return adminApi("addEvent", event);
}
export async function adminUpdateEvent(event) {
  return adminApi("updateEvent", event);
}
export async function adminDeleteEvent(id) {
  return adminApi("deleteEvent", { id });
}

export async function adminGetWeeklyRounds() {
  return adminApi("getWeeklyRounds");
}
export async function adminAddWeeklyRound(round) {
  return adminApi("addWeeklyRound", round);
}
export async function adminUpdateWeeklyRound(round) {
  return adminApi("updateWeeklyRound", round);
}
export async function adminDeleteWeeklyRound(id) {
  return adminApi("deleteWeeklyRound", { id });
}

export async function adminGetWeeklyResults() {
  return adminApi("getWeeklyResults");
}
export async function adminAddWeeklyResult(result) {
  return adminApi("addWeeklyResult", result);
}
export async function adminUpdateWeeklyResult(result) {
  return adminApi("updateWeeklyResult", result);
}
export async function adminDeleteWeeklyResult(id) {
  return adminApi("deleteWeeklyResult", { id });
}

export async function adminGetPrizePayouts() {
  return adminApi("getPrizePayouts");
}
export async function adminAddPrizePayout(payout) {
  return adminApi("addPrizePayout", payout);
}
export async function adminUpdatePrizePayout(payout) {
  return adminApi("updatePrizePayout", payout);
}
export async function adminDeletePrizePayout(id) {
  return adminApi("deletePrizePayout", { id });
}

export async function adminGetSettings() {
  return adminApi("getSettings");
}
export async function adminUpdateSettings(settings) {
  return adminApi("updateSettings", settings);
}

export async function adminGetScoringSystem() {
  return adminApi("getScoringSystem");
}
export async function adminUpdateScoringSystem(rules) {
  return adminApi("updateScoringSystem", { rules });
}

export async function adminGetNews() {
  return adminApi("getNews");
}
export async function adminAddNews(news) {
  return adminApi("addNews", news);
}
export async function adminUpdateNews(news) {
  return adminApi("updateNews", news);
}
export async function adminDeleteNews(id) {
  return adminApi("deleteNews", { id });
}

// ----------- PUBLIC ENDPOINTS ------------
export async function apiFetch(path, { method = "GET", data } = {}) {
  let urlPath = path.startsWith("/api") ? path.slice(4) : path;
  const url = `${API_BASE}${urlPath.startsWith("/") ? urlPath : "/" + urlPath}`;
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