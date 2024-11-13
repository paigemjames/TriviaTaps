import React, { useEffect } from "react";
import '../index.css';
import { Link } from "react-router-dom";
import P_Navbar from "./P_Navbar";
import Taps from '../assets/taps.png'; 

const P_QuizStart = () => {
    useEffect(() => {
        document.title = "Trivia Taps - Participant Quiz Start";
    }, []);

    return (
        <div className="body">
            <div className="header"><h1>Trivia Taps</h1></div>

            {/* Database integration placeholder */}
            <div className="red-rectangle-button">
                <h3>Quiz Category will load here</h3>
            </div>

            {/* Image link to start quiz */}
            <div className="image-container">
                <Link to="/ParticipantQuizQuestions">
                    <img src={Taps} alt="Trivia" className="center-image" />
                </Link>
            </div>
            <p>Click the drinks to start your quiz!</p>

            {/* Bottom navbar */}
            <P_Navbar />
        </div>
    );
};

export default P_QuizStart;