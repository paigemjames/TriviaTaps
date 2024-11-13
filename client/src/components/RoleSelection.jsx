import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; 
import Taps from '../assets/taps.png'; 

const RoleSelection = () => {
  return (
    <div className="role-selection">
      <h1>Trivia Taps</h1>

      
      <div className="icon-container">
        <img src={Taps} alt="Trivia" className="center-image" />
      </div>
      
      <div className="role-buttons">
        <Link to="/ParticipantLogin" className="role-button">Quiz Participant</Link>
        <Link to="/HostLogin" className="role-button">Trivia Host</Link>
         
        <Link to="/admin" className="role-button">Administrator</Link>{/*to be included later */}
      </div>
    </div>
  );
};

export default RoleSelection;
