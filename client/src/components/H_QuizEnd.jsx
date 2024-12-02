import React, { useEffect } from "react";
import '../index.css';
import H_Navbar from "./H_Navbar";
import { Link, useNavigate } from 'react-router-dom';
import Taps from '../assets/taps.png'; 

const H_QuizEnd = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz End";
  }, []);

  return (
    <div className="shared-screen">
      <div className="header"><h1>Trivia Taps</h1></div>
      <div className="yellow-text">
        Quiz Catagory Here 
      </div>
      <div className="yellow-text">
        That's the last question!
      </div>
{/* THIS WILL NEED TO CHANGE  */}
      <div className="image-container">
        <Link to="/ParticipantLeaderboard"> 
          <img src={Taps} alt="Trivia" className="center-image" />
        </Link>
      </div>
      
      <p>Click the drinks to close the quiz for all users!</p>
      <div className="role-buttons">
        <Link to="/HostGameStats" className="role-button">Game Stats</Link>
        <Link to="/HostLeaderboard" className="role-button">View Leaderboard</Link>

      </div>
      <H_Navbar />
    </div>
  );
};

export default H_QuizEnd;
