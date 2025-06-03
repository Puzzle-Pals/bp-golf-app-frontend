import { useState } from "react";

export default function ScoringSystemToggle() {
  const [system, setSystem] = useState("Standard");

  return (
    <div style={{
      background: '#3C2F2F',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '2rem',
      margin: '2rem 0',
      color: '#F5E8C7'
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.25rem' }}>Scoring System</h2>
      <p style={{ marginBottom: '1.5rem', color: '#F5E8C7' }}>
        Toggle between different scoring systems for the league.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: 16 }}>
        <button
          onClick={() => setSystem("Standard")}
          style={{
            background: system === "Standard" ? '#C71585' : '#1B4D3E',
            color: '#F5E8C7',
            border: '1px solid #C71585',
            borderRadius: 4,
            padding: '0.5rem 1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Standard
        </button>
        <button
          onClick={() => setSystem("Handicap")}
          style={{
            background: system === "Handicap" ? '#C71585' : '#1B4D3E',
            color: '#F5E8C7',
            border: '1px solid #C71585',
            borderRadius: 4,
            padding: '0.5rem 1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Handicap
        </button>
      </div>
      <div>
        <span style={{ color: '#87CEEB', fontWeight: 600 }}>Current System:</span> {system}
      </div>
    </div>
  );
}