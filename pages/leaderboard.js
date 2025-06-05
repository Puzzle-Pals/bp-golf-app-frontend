import { query } from "../../lib/db";

// Returns: [{ player_id, name, totalpoints, totalscore, eventsplayed }]
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  // You will want to adjust scoring logic as needed for your points rules!
  const result = await query(`
    SELECT 
      p.id as player_id,
      p.name,
      COALESCE(SUM(
        (CASE WHEN wr.wins ?| ARRAY[p.name] THEN 5 ELSE 0 END) + 
        (CASE WHEN wr.second ?| ARRAY[p.name] THEN 3 ELSE 0 END) +
        (CASE WHEN wr.high_score ?| ARRAY[p.name] THEN 2 ELSE 0 END) +
        (CASE WHEN wr.deuce ?| ARRAY[p.name] THEN 1 ELSE 0 END) +
        (CASE WHEN wr.ctp = p.name THEN 1 ELSE 0 END)
      ),0) as totalpoints,
      COALESCE(SUM(wr.total_score),0) as totalscore,
      COUNT(wr.id) as eventsplayed
    FROM players p
    LEFT JOIN weekly_results wr
      ON (wr.wins ?| ARRAY[p.name] OR wr.second ?| ARRAY[p.name] OR wr.high_score ?| ARRAY[p.name] OR wr.deuce ?| ARRAY[p.name] OR wr.ctp = p.name)
    GROUP BY p.id, p.name
    ORDER BY totalpoints DESC, totalscore ASC
  `);
  res.status(200).json(result.rows);
}