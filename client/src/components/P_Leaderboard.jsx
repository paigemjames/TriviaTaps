import React, { useEffect } from "react";
import '../index.css';
import P_Navbar from "./P_Navbar";

const P_Leaderboard = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Leaderboard";
  }, []);

  return (
    <div className="body">
        <div className="header"><h1>Leaderboard</h1></div>

        
    </div>
);
};


export default P_Leaderboard;
