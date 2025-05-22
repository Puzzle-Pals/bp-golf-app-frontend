import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./index"; // Now using index.js as homepage
import WeeklyResults from "./pages/WeeklyResults";
import PlayerStats from "./pages/PlayerStats";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weekly-results" element={<WeeklyResults />} />
        <Route path="/player-stats" element={<PlayerStats />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
