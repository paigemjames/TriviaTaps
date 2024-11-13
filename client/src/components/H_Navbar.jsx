import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faTrophy, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'

const H_Navbar = () => {
    return (
        <nav className="navbar">
            {/* Brain Icon for Quiz Categories */}
            <Link to="/HostQuizCategories" className="nav-item">
                <FontAwesomeIcon icon={faBrain} className="icon" />
            </Link>

            {/* Trophy Icon for Leaderboard */}
            <div className="nav-item">
                <FontAwesomeIcon icon={faTrophy} className="icon" />
            </div>


            <div className="nav-item">
                <FontAwesomeIcon icon={faUser} className="icon" />
            </div>

            <Link to="/HostLogOut" className="nav-item">
                <FontAwesomeIcon icon={faCog} className="icon" />
            </Link>
        </nav>
    );
};

export default H_Navbar;