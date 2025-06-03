import React, { useState, useEffect } from "react";
import PlayerManagement from "../components/PlayerManagement";
import EventManagement from "../components/EventManagement";
import WeeklyRoundManagement from "../components/WeeklyRoundManagement";
import WeeklyResultsManagement from "../components/WeeklyResultsManagement";
import PrizePayouts from "../components/PrizePayouts";
import ScoringSystemToggle from "../components/ScoringSystemToggle";
import Messaging from "../components/Messaging";
import AdminLogin from "../components/AdminLogin";

const TOKEN_KEY = "adminToken";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(TOKEN_KEY)) {
      setLoggedIn(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setLoggedIn(false);
  }

  if (!loggedIn)
    return (
      <div className="container mt-4">
        <h1 className="text-center mb-4">Admin Panel</h1>
        <AdminLogin onSuccess={() => setLoggedIn(true)} />
      </div>
    );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Admin Panel</h1>
      <div className="mb-3">
        <button className="btn btn-secondary btn-sm float-end" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <PlayerManagement />
      <EventManagement />
      <WeeklyRoundManagement />
      <WeeklyResultsManagement />
      <PrizePayouts />
      <ScoringSystemToggle />
      <Messaging />
    </div>
  );
}