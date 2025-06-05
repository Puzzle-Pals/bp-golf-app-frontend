import { useState } from "react";

export default function WeeklyResultsCard({ players, weeklyResults, setWeeklyResults }) {
  const [weekNum, setWeekNum] = useState("");
  const [winners, setWinners] = useState({
    wins: ["", ""],
    second: ["", ""],
    highScore: ["", ""],
    deuce: ["", ""],
    ctp: ""
  });
  const [editIdx, setEditIdx] = useState(-1);

  function getAvailablePlayers(selected) {
    // selected: array of all selected player names for this week
    return players
      .map(p => p.name)
      .filter(name => !selected.includes(name));
  }

  function handleWinnerChange(prize, idx, value) {
    let allSelected = [
      ...winners.wins,
      ...winners.second,
      ...winners.highScore,
      ...winners.deuce,
      winners.ctp
    ].filter(Boolean);

    // If editing an existing select, remove the current value from allSelected
    const oldVal = prize === "ctp"
      ? winners.ctp
      : winners[prize][idx];

    allSelected = allSelected.filter(n => n !== oldVal);

    // Now add the new value
    if (value) allSelected.push(value);

    // Update state
    if (prize === "ctp") {
      setWinners(w => ({ ...w, ctp: value }));
    } else {
      setWinners(w => {
        const arr = [...w[prize]];
        arr[idx] = value;
        return { ...w, [prize]: arr };
      });
    }
  }

  function available(prize, idx) {
    // Which names are already picked for this week, except for the current select
    const allSelected = [
      ...winners.wins,
      ...winners.second,
      ...winners.highScore,
      ...winners.deuce,
      winners.ctp
    ].filter(Boolean);

    // Remove this select's current value so it can be re-selected
    const current = prize === "ctp" ? winners.ctp : winners[prize][idx];
    return players
      .map(p => p.name)
      .filter(n => !allSelected.includes(n) || n === current);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!weekNum) return;
    const entry = {
      weekNum,
      wins: winners.wins.slice(),
      second: winners.second.slice(),
      highScore: winners.highScore.slice(),
      deuce: winners.deuce.slice(),
      ctp: winners.ctp
    };
    if (editIdx >= 0) {
      const arr = [...weeklyResults];
      arr[editIdx] = entry;
      setWeeklyResults(arr);
      setEditIdx(-1);
    } else {
      setWeeklyResults([...weeklyResults, entry]);
    }
    setWeekNum("");
    setWinners({
      wins: ["", ""],
      second: ["", ""],
      highScore: ["", ""],
      deuce: ["", ""],
      ctp: ""
    });
  }

  function handleEdit(idx) {
    const w = weeklyResults[idx];
    setWeekNum(w.weekNum);
    setWinners({
      wins: w.wins.slice(),
      second: w.second.slice(),
      highScore: w.highScore.slice(),
      deuce: w.deuce.slice(),
      ctp: w.ctp
    });
    setEditIdx(idx);
  }

  function handleDelete(idx) {
    setWeeklyResults(weeklyResults.filter((_, i) => i !== idx));
    if (editIdx === idx) setEditIdx(-1);
  }

  return (
    <div>
      <h3 style={styles.cardTitle}>Weekly Results</h3>
      <form onSubmit={handleSave} style={{ marginBottom: 20 }}>
        <div style={styles.formRow}>
          <input
            type="number"
            placeholder="Week #"
            style={styles.input}
            value={weekNum}
            onChange={e => setWeekNum(e.target.value)}
            required
            min={1}
          />
        </div>
        <div style={styles.formRow}>
          {[0,1].map(i => (
            <select key={"win"+i} style={styles.input} value={winners.wins[i]}
              onChange={e => handleWinnerChange("wins", i, e.target.value)} required={i===0}>
              <option value="">{i===0 ? "Win #1" : "Win #2"}</option>
              {available("wins", i).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          ))}
          {[0,1].map(i => (
            <select key={"second"+i} style={styles.input} value={winners.second[i]}
              onChange={e => handleWinnerChange("second", i, e.target.value)} required={i===0}>
              <option value="">{i===0 ? "2nd Place #1" : "2nd Place #2"}</option>
              {available("second", i).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          ))}
        </div>
        <div style={styles.formRow}>
          {[0,1].map(i => (
            <select key={"highscore"+i} style={styles.input} value={winners.highScore[i]}
              onChange={e => handleWinnerChange("highScore", i, e.target.value)} required={i===0}>
              <option value="">{i===0 ? "Highest Score #1" : "Highest Score #2"}</option>
              {available("highScore", i).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          ))}
          {[0,1].map(i => (
            <select key={"deuce"+i} style={styles.input} value={winners.deuce[i]}
              onChange={e => handleWinnerChange("deuce", i, e.target.value)} required={i===0}>
              <option value="">{i===0 ? "Deuce Pot #1" : "Deuce Pot #2"}</option>
              {available("deuce", i).map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          ))}
          <select style={styles.input} value={winners.ctp} onChange={e => handleWinnerChange("ctp", null, e.target.value)} required>
            <option value="">Closest to Pin</option>
            {available("ctp", null).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" style={styles.button}>
            {editIdx >= 0 ? "Update" : "Add"}
          </button>
          {editIdx >= 0 && (
            <button type="button" onClick={() => {
              setEditIdx(-1);
              setWeekNum("");
              setWinners({ wins: ["", ""], second: ["", ""], highScore: ["", ""], deuce: ["", ""], ctp: "" });
            }} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div>
        <h4 style={{ margin: "16px 0 8px", color: "#30635E", fontWeight: 500 }}>Weekly Results List</h4>
        {weeklyResults.length === 0 && <div style={{ color: "#9CA7A0" }}>No results yet.</div>}
        <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
          {weeklyResults
            .slice()
            .sort((a, b) => Number(a.weekNum) - Number(b.weekNum))
            .map((w, i) => (
            <li key={w.weekNum + (w.wins[0] || "")} style={styles.listRow}>
              <span>
                <b>Week {w.weekNum}</b>:&nbsp;
                Wins: {w.wins.join(", ") || "-"};&nbsp;
                2nd: {w.second.join(", ") || "-"};&nbsp;
                High Score: {w.highScore.join(", ") || "-"};&nbsp;
                Deuce: {w.deuce.join(", ") || "-"};&nbsp;
                CTP: {w.ctp || "-"}
              </span>
              <span>
                <button onClick={() => handleEdit(i)} style={styles.smallBtn}>Edit</button>
                <button onClick={() => handleDelete(i)} style={styles.smallBtnDelete}>Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- STYLES ---
const styles = {
  cardTitle: { fontSize: 20, fontWeight: 600, marginBottom: 16, color: "#102A23" },
  formRow: { display: "flex", gap: 12, marginBottom: 10, flexWrap: "wrap" },
  input: {
    flex: "1 1 100px",
    fontSize: 16,
    padding: 10,
    borderRadius: 7,
    border: "1px solid #DDE5E0",
    background: "#F8FAF9",
    color: "#102A23",
    boxShadow: "0 1px 1.5px #e0e0e0",
    marginBottom: 0,
  },
  button: {
    background: "linear-gradient(90deg,#29947B,#155853)",
    color: "#FFF", border: "none", borderRadius: 6, fontWeight: 600,
    padding: "10px 32px", fontSize: 16, cursor: "pointer", marginRight: 8, boxShadow: "0 1px 5px #dbece6"
  },
  cancelButton: {
    background: "#fff", color: "#20504F", border: "1px solid #DDE5E0", borderRadius: 6, fontWeight: 500,
    padding: "10px 20px", fontSize: 16, cursor: "pointer", marginLeft: 8
  },
  listRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "8px 0", borderBottom: "1px solid #F2F5F4"
  },
  smallBtn: {
    background: "#E5F3EF", color: "#20504F", border: "1px solid #DDE5E0", borderRadius: 5, fontWeight: 500,
    padding: "4px 14px", fontSize: 14, cursor: "pointer", marginRight: 8
  },
  smallBtnDelete: {
    background: "#F9E8E8", color: "#B90000", border: "1px solid #E2BDBD", borderRadius: 5, fontWeight: 500,
    padding: "4px 14px", fontSize: 14, cursor: "pointer"
  }
};