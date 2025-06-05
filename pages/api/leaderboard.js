import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    // This query assumes player_stats is populated and weekly_results uses player names in JSONB arrays
    const result = await query(`
      SELECT 
        p.id AS player_id,
        p.name,
        COALESCE(ps.total_points, 0) AS totalpoints,
        COALESCE(SUM(wr.total_score), 0) AS totalscore,
        COALESCE(ps.rounds_played, 0) AS eventsplayed
      FROM players p
      LEFT JOIN player_stats ps ON ps.player_id = p.id
      LEFT JOIN weekly_results wr 
        ON (
          wr.wins @> to_jsonb(p.name)::jsonb
          OR wr.second @> to_jsonb(p.name)::jsonb
          OR wr.high_score @> to_jsonb(p.name)::jsonb
          OR wr.deuce @> to_jsonb(p.name)::jsonb
        )
      GROUP BY p.id, p.name, ps.total_points, ps.rounds_played
      ORDER BY totalpoints DESC, totalscore DESC, p.name ASC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("API /leaderboard error:", err);
    res.status(500).json({ error: err.message });
  }
}