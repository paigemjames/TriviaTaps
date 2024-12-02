import React, { useEffect } from "react";
import '../index.css';
import H_Navbar from "./H_Navbar";

const H_GameStats = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Game Stats";
  }, []);

  return (
    <div className="shared-screen">
      <div className="header"><h1>Trivia Taps</h1></div>
      <div className="yellow-text">
        Game Stats here
      </div>
    </div>
  );
};

export default H_GameStats