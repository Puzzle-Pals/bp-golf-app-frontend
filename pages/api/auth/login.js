import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hardcode the hash for 'boss102935'
const ADMIN_PASSWORD_HASH = "$2a$10$5SA9Rmbn6HBF53IzWcXwt.7XwVdGKOi9R3Q9vK7K1g1rXNJgE7B5K";
// Hardcode a JWT secret (change if you want, but this is fine for most projects)
const JWT_SECRET = "mysupersecretjwtkey";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });

  let valid = false;
  try {
    valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }

  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { admin: true },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({ token });
}