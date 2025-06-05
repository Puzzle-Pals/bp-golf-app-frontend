import { query } from "../../lib/db";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const result = await query("SELECT * FROM players ORDER BY name ASC");
    res.status(200).json(result.rows);
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    const result = await query(
      "INSERT INTO players (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } else if (req.method === "PUT") {
    const { id, name, email } = req.body;
    const result = await query(
      "UPDATE players SET name=$1, email=$2 WHERE id=$3 RETURNING *",
      [name, email, id]
    );
    res.status(200).json(result.rows[0]);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await query("DELETE FROM players WHERE id=$1", [id]);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}