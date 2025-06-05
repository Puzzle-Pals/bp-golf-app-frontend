import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const result = await query(
        "SELECT id, title, description, event_date, location, created_at FROM events ORDER BY event_date ASC"
      );
      res.status(200).json(result.rows);
    } else if (req.method === "POST") {
      const { title, description, event_date, location } = req.body;
      const result = await query(
        "INSERT INTO events (title, description, event_date, location) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, event_date, location]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await query("DELETE FROM events WHERE id=$1", [id]);
      res.status(200).json({ success: true });
    } else {
      res.status(405).end();
    }
  } catch (err) {
    console.error("API /events error:", err);
    res.status(500).json({ error: err.message });
  }
}