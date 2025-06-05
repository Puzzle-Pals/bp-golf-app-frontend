import { query } from "../../lib/db";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const result = await query("SELECT id, headline as title, body as details, created_at as date FROM news ORDER BY created_at DESC");
    res.status(200).json(result.rows);
  } else if (req.method === "POST") {
    const { headline, body } = req.body;
    const result = await query(
      "INSERT INTO news (headline, body) VALUES ($1, $2) RETURNING *",
      [headline, body]
    );
    res.status(201).json(result.rows[0]);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await query("DELETE FROM news WHERE id=$1", [id]);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}