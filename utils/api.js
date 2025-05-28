const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  // eslint-disable-next-line no-console
  console.error('FATAL: NEXT_PUBLIC_API_BASE_URL is not defined in your .env file!');
}

export async function adminLogin(password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return res.json();
}

export function storeAdminToken(token) {
  localStorage.setItem('adminToken', token);
}

export function getAdminToken() {
  return localStorage.getItem('adminToken');
}

export function removeAdminToken() {
  localStorage.removeItem('adminToken');
}

export async function getProtectedAdminData() {
  const token = getAdminToken();
  if (!token) {
    return { error: "Not authenticated" };
  }
  const res = await fetch(`${API_BASE_URL}/admin/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}