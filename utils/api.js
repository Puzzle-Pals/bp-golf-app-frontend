const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Example admin login function
export async function adminLogin(password) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  return res.json();
}

// Example protected admin route function
export async function getProtectedAdminData(token) {
  const res = await fetch(`${API_BASE_URL}/admin/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}