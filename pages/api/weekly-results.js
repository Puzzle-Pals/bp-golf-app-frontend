import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    const result = await query(`
      SELECT
        id,
        week_num AS week_number,
        wins,
        second,
        deuce,
        ctp,
        high_score
      FROM weekly_results
      ORDER BY week_num DESC
    `);

    const formatted = result.rows.map(row => ({
      ...row,
      wins: Array.isArray(row.wins) ? row.wins : (row.wins ? JSON.parse(row.wins) : []),
      second: Array.isArray(row.second) ? row.second : (row.second ? JSON.parse(row.second) : []),
      deuce: Array.isArray(row.deuce) ? row.deuce : (row.deuce ? JSON.parse(row.deuce) : []),
      high_score: Array.isArray(row.high_score) ? row.high_score : (row.high_score ? JSON.parse(row.high_score) : []),
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("API /weekly-results error:", err);
    res.status(500).json({ error: err.message });
  }
}