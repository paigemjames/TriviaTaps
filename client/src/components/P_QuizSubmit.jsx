import React, { useEffect } from "react";
import '../index.css';
import P_Navbar from "./P_Navbar";
import Taps from '../assets/taps.png'; 
import { Link } from "react-router-dom";

const P_QuizSubmit = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Quiz Submit";
  }, []);

  return (
    <div className="shared-screen">
      <div className="header"><h1>Trivia Taps</h1></div>

      <div class="yellow-text">
        That's the last question!
      </div>

      <div className="image-container">
        <Link to="/ParticipantLeaderboard">
          <img src={Taps} alt="Trivia" className="center-image" />
        </Link>
      </div>
      
      <p>Click the drinks to submit your quiz and view the leaderboard!</p>
      <P_Navbar />
    </div>
  );
};

export default P_QuizSubmit;
