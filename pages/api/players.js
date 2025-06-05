import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const result = await query(
        "SELECT id, first_name, last_name, email, joined_at, active FROM players ORDER BY first_name ASC, last_name ASC"
      );
      res.status(200).json(result.rows);
    } else if (req.method === "POST") {
      const { first_name, last_name, email } = req.body;
      if (!first_name || !last_name) {
        return res.status(400).json({ error: "First and Last name are required" });
      }
      const result = await query(
        "INSERT INTO players (first_name, last_name, email) VALUES ($1, $2, $3) RETURNING id, first_name, last_name, email, joined_at, active",
        [first_name, last_name, email]
      );
      res.status(201).json(result.rows[0]);
    } else if (req.method === "PUT") {
      const { id, first_name, last_name, email, active } = req.body;
      if (!first_name || !last_name) {
        return res.status(400).json({ error: "First and Last name are required" });
      }
      const result = await query(
        "UPDATE players SET first_name=$1, last_name=$2, email=$3, active=COALESCE($4, active) WHERE id=$5 RETURNING id, first_name, last_name, email, joined_at, active",
        [first_name, last_name, email, active, id]
      );
      res.status(200).json(result.rows[0]);
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await query("DELETE FROM players WHERE id=$1", [id]);
      res.status(200).json({ success: true });
    } else {
      res.status(405).end();
    }
  } catch (err) {
    console.error("API /players error:", err);
    res.status(500).json({ error: err.message });
  }
}