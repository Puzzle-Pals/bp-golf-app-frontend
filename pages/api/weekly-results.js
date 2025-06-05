import { query } from "../../lib/db";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const result = await query(`
      SELECT 
        id,
        week_num as week_number,
        date,
        wins,
        second,
        high_score,
        deuce,
        ctp
      FROM weekly_results
      ORDER BY week_num ASC
    `);
    const rows = result.rows.map(row => ({
      ...row,
      wins: row.wins || [],
      second: row.second || [],
      high_score: row.high_score || [],
      deuce: row.deuce || [],
      ctp: row.ctp || ""
    }));
    res.status(200).json(rows);
  } else if (req.method === "POST") {
    const { week_num, wins, second, high_score, deuce, ctp } = req.body;
    const result = await query(
      `INSERT INTO weekly_results (week_num, wins, second, high_score, deuce, ctp)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        week_num,
        JSON.stringify(wins),
        JSON.stringify(second),
        JSON.stringify(high_score),
        JSON.stringify(deuce),
        ctp
      ]
    );
    res.status(201).json(result.rows[0]);
  } else if (req.method === "PUT") {
    const { id, week_num, wins, second, high_score, deuce, ctp } = req.body;
    const result = await query(
      `UPDATE weekly_results SET week_num=$1, wins=$2, second=$3, high_score=$4, deuce=$5, ctp=$6 WHERE id=$7 RETURNING *`,
      [
        week_num,
        JSON.stringify(wins),
        JSON.stringify(second),
        JSON.stringify(high_score),
        JSON.stringify(deuce),
        ctp,
        id
      ]
    );
    res.status(200).json(result.rows[0]);
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    await query("DELETE FROM weekly_results WHERE id=$1", [id]);
    res.status(200).json({ success: true });
  } else {
    res.status(405).end();
  }
}