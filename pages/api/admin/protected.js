import jwt from "jsonwebtoken";

const JWT_SECRET = "bpgolfapp";

export default function handler(req, res) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = header.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.admin) throw new Error("Not admin");
    res.status(200).json({ message: "Secret admin content" });
  } catch (e) {
    res.status(401).json({ error: "Session expired" });
  }
}