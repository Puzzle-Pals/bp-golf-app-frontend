import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: "30m" });

  res.setHeader("Set-Cookie", [
    `bp_admin_token=${token}; HttpOnly; Path=/; Max-Age=1800; SameSite=Strict; Secure; Domain=.vercel.app`
  ]);
  res.status(200).json({ ok: true });
}