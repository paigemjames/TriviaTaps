import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faTrophy, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

const P_Navbar = () => {
  return (
    <nav className="navbar">
      {/* Brain Icon for Quiz Categories */}
      <Link to="/ParticipantQuizCategories" className="nav-item">
        <FontAwesomeIcon icon={faBrain} className="icon" />
      </Link>

      {/* Trophy Icon for Leaderboard */}
      <Link to="/ParticipantLeaderboard" className="nav-item">
        <FontAwesomeIcon icon={faTrophy} className="icon" />
      </Link>


      <Link to="/ParticipantProfile" className="nav-item">
        <FontAwesomeIcon icon={faUser} className="icon" />
      </Link>

      <Link to="/ParticipantLogOut" className="nav-item">
        <FontAwesomeIcon icon={faCog} className="icon" />
      </Link>
    </nav>
  );
};

export default P_Navbar;
