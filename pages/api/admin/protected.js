import jwt from "jsonwebtoken";

function authenticate(req, res) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Not authorized" });
    return null;
  }
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretjwtkey");
    return decoded;
  } catch (e) {
    res.status(401).json({ error: "Invalid token" });
    return null;
  }
}

export default function handler(req, res) {
  const user = authenticate(req, res);
  if (!user) return;
  // Example: replace this with real data as needed.
  res.json({ message: "Secret admin data. You are authenticated!", players: [] });
}