import { useState, useEffect } from "react";
export default function AdminSettings() {
  const [scoring, setScoring] = useState("default");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(data => setScoring(data?.scoring || "default"))
      .catch(() => setError("Failed to load settings"));
  }, []);

  function handleToggle() {
    const newScoring = scoring === "default" ? "alternative" : "default";
    fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scoring: newScoring }),
    })
      .then(r => r.json())
      .then(data => setScoring(data?.scoring || newScoring))
      .catch(() => setError("Failed to update settings"));
  }

  return (
    <div>
      <h2>Settings</h2>
      {error && <div style={{ color: "#C71585" }}>{error}</div>}
      <div>
        <span>Scoring system: <b>{scoring}</b></span>
        <button onClick={handleToggle} style={{ marginLeft: 16 }}>Toggle Scoring</button>
      </div>
    </div>
  );
}