import { query } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  // Adjust field names to match your DB schema!
  const result = await query(`SELECT id, headline as title, body as details, created_at as date FROM news ORDER BY created_at DESC LIMIT 30`);
  res.status(200).json(result.rows);
}