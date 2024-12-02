import React, { useEffect } from "react";
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import Taps from '../assets/taps.png'; 
import P_Navbar from "./P_Navbar";

const P_LogOut = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Log Out";
  }, []);

    return (
        <div className="shared-screen">
            <div className="header"><h1>Trivia Taps</h1></div>
            <div className="yellow-text">
                Profile
            </div>
            
            <div className="image-container">
                    <img src={Taps} alt="Trivia" className="center-image" />              
            </div>

            <div className="role-buttons">  {/* THIS WILL NEED TO CHANGE  */}
                <Link to="/HostGameStats" className="role-button">Scores</Link>
                <Link to="/HostLeaderboard" className="role-button">Favourite Quizzes</Link>

            </div>
            <P_Navbar />
        </div>
    );
};

export default P_LogOut;