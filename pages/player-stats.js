import { query } from "../../lib/db";

// Returns: [{ player_id, name, averagescore, roundsplayed }]
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  // Adjust field names to match your DB schema!
  const result = await query(
    `
    SELECT 
      p.id as player_id, 
      p.name, 
      ROUND(AVG(wr.total_score)::numeric,2) as averagescore,
      COUNT(wr.id) as roundsplayed
    FROM players p
    LEFT JOIN weekly_results wr 
      ON (wr.wins ?| ARRAY[p.name] OR wr.second ?| ARRAY[p.name] OR wr.high_score ?| ARRAY[p.name] OR wr.deuce ?| ARRAY[p.name] OR wr.ctp = p.name)
    GROUP BY p.id, p.name
    ORDER BY p.name ASC
    `
  );
  res.status(200).json(result.rows);
}