import { useState } from "react";
export default function AdminDiagnostic() {
  const [status, setStatus] = useState("");

  function handleRunDiagnostics() {
    setStatus("Running...");
    fetch("/api/diagnostic")
      .then(r => r.json())
      .then(data => setStatus(data?.result || "Check complete."))
      .catch(() => setStatus("Failed to run diagnostics"));
  }

  return (
    <div>
      <h2>Diagnostic Tools</h2>
      <button onClick={handleRunDiagnostics}>Run Diagnostics</button>
      {status && <div style={{ marginTop: 16, color: status.startsWith("Failed") ? "#C71585" : "#4BB543" }}>{status}</div>}
    </div>
  );
}