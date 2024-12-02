import React, { useEffect } from "react";
import '../index.css';
import H_Navbar from "./H_Navbar";

const H_Leaderboard = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Leaderboard";
  }, []);

  return (
    <div className="shared-screen">
      <div className="header"><h1>Trivia Taps</h1></div>
      <div className="yellow-text">
        Leaderboard here
      </div>
    </div>
  );
};

export default H_Leaderboard;