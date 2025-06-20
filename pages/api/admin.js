export default async function handler(req, res) {
  const backendUrl = "https://bp-golf-app-backend.vercel.app/api/admin";
  
  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to reach backend" });
  }
}