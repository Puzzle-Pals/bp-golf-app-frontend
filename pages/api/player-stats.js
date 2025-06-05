import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const result = await query(`
      SELECT
        p.id AS player_id,
        p.name,
        COALESCE(ps.average_score, 0) AS averagescore,
        COALESCE(ps.rounds_played, 0) AS roundsplayed
      FROM players p
      LEFT JOIN player_stats ps ON ps.player_id = p.id
      ORDER BY p.name ASC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("API /player-stats error:", err);
    res.status(500).json({ error: err.message });
  }
}