import { query } from "../../lib/db";

// Returns: all weekly results, including all winner fields as arrays (for public display)
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  const result = await query(`
    SELECT 
      id,
      week_num as week_number,
      date,
      wins, second, high_score, deuce, ctp
    FROM weekly_results
    ORDER BY week_num ASC
  `);
  // Parse JSON arrays for display
  const rows = result.rows.map(row => ({
    ...row,
    wins: row.wins || [],
    second: row.second || [],
    high_score: row.high_score || [],
    deuce: row.deuce || [],
    ctp: row.ctp || ""
  }));
  res.status(200).json(rows);
}