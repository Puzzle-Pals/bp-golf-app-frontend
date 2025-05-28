import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// bcrypt hash for 'admin1029'
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  "$2a$10$B9kE4e5hF6sK3p7Q8uHhOexuQp/2Gf9rQm6hC9kEoImzP6XkT6T7u";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });

  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { admin: true },
    process.env.JWT_SECRET || "supersecretjwtkey",
    { expiresIn: "2h" }
  );

  res.status(200).json({ token });
}