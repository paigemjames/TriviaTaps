import React, { useEffect, useState } from "react";
import '../index.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import P_Navbar from "./P_Navbar";
import Taps from '../assets/taps.png';

const P_QuizStart = () => {
    const [quizData, setQuizData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Trivia Taps - Participant Quiz Start";
        fetchQuizData();
    }, []);

    const fetchQuizData = async () => {
        try {
            const response = await axios.get("http://localhost:5050/quiz/current"); // Replace with appropriate endpoint
            setQuizData(response.data);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    };

    const startQuiz = () => {
        navigate("/ParticipantQuizQuestions", { state: { quizData } });
    };

    return (
        <div className="body">
            <div className="header"><h1>Trivia Taps</h1></div>
            <div className="red-rectangle-button">
                <h3>{quizData ? quizData.category : "Loading Category..."}</h3>
            </div>
            <div className="image-container">
                <img src={Taps} alt="Trivia" className="center-image" onClick={startQuiz} />
            </div>
            <p>Click the drinks to start your quiz!</p>
            <P_Navbar />
        </div>
    );
};

export default P_QuizStart;
