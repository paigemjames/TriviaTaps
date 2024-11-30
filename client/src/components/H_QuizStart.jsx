import React, { useEffect } from "react";
import '../index.css';
import { Link } from "react-router-dom";
import P_Navbar from "./P_Navbar";
import Taps from '../assets/taps.png'; 

const H_QuizStart = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz Start";
  }, []);

  return (
    <div className="body">
    <div className="header"><h1>Trivia Taps</h1></div>

    {/* Database integration placeholder */}
    <div className="red-rectangle-button">
        <h3>Quiz Category will load here</h3>
    </div>


    <div className="image-container">
        <Link to="/HostQuestionRelease">
            <img src={Taps} alt="Trivia" className="center-image" />
        </Link>
    </div>
    <p>Click the drinks to host the quiz!</p>

    {/* Bottom navbar */}
    <P_Navbar />
</div>
  );
};

export default H_QuizStart;
