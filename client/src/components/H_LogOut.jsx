import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';
import Taps from '../assets/taps.png';

const H_LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title on component mount
    document.title = "Trivia Taps - Host Logout";
  }, []);

  const handleLogOut = () => {
    // Logic for log out (e.g., clearing session or cookies) can be added here

    // Navigate to the host login page
    navigate('/RoleSelection');
  };

  return (
    <div className="shared-screen">
      <h1>Trivia Taps</h1>
      <div className="icon-container">
        <img src={Taps} alt="Trivia logo" className="center-image" />
      </div>
      <button 
        className="role-button" 
        onClick={handleLogOut}
        aria-label="Log out from host session"
      >
        Log Out
      </button>
    </div>
  );
};

export default H_LogOut;
