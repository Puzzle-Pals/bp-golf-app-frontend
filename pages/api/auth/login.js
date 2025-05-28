import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD_HASH = "$2a$10$7r9pA5e.k44a9gM6T1tB6eO1K2DyaqZ3H0qxwZzCPiaw7Y5qX8f36"; // for 'admin1029'
const JWT_SECRET = "mysupersecretjwtkey";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { password } = req.body;

  // DEBUG LOGGING
  console.log("=== LOGIN ATTEMPT ===");
  console.log("Password received:", password);

  if (!password) {
    console.log("No password provided.");
    return res.status(400).json({ error: "Password required" });
  }

  let valid = false;
  try {
    valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    console.log("bcrypt.compare result:", valid);
  } catch (err) {
    console.log("bcrypt.compare error:", err);
    return res.status(500).json({ error: "Server error" });
  }

  if (!valid) {
    console.log("Invalid password.");
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwt.sign(
    { admin: true },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  console.log("Login successful. Token generated.");
  res.status(200).json({ token });
}