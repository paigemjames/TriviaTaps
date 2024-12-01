import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import "../index.css";
import P_Navbar from "./P_Navbar";

const P_QuizQuestions = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { quizId } = useParams(); // Retrieve quizId from URL params

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/quizzes/${quizId}`);
        console.log("API Response:", response); // Debug API response
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        console.log("Quiz Data:", data); // Debug parsed data
        setQuizData(data);
      } catch (err) {
        console.error("Error fetching quiz:", err.message); // Log error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);
  

  const handleOptionClick = (optionId) => {
    if (!isLocked) {
      setSelectedOption(optionId);
    }
  };

  const handleLockClick = () => {
    if (selectedOption !== null) {
      setIsLocked(true);
      console.log(`Locked answer: ${selectedOption}`);
      setTimeout(() => {
        if (currentQuestionIndex === quizData.questions.length - 1) {
          navigate("/ParticipantQuizSubmit");
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
          setIsLocked(false);
        }
      }, 1000);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!quizData) return null;

  const currentQuestion = quizData.questions[currentQuestionIndex];

  return (
    <div className="quiz-page">
      <h2 className="quiz-title">{quizData.title}</h2>
      <div className="question">{currentQuestion.question}</div>
      <div className="options-container">
        {currentQuestion.options.map((option) => (
          <div
            key={option.id}
            className={`option ${selectedOption === option.id ? "selected" : ""} ${
              isLocked ? "locked" : ""
            }`}
            onClick={() => handleOptionClick(option.id)}
          >
            {option.text}
          </div>
        ))}
      </div>
      <button className="lock-button" onClick={handleLockClick} disabled={isLocked}>
        🔒 Lock
      </button>
      <P_Navbar />
    </div>
  );
};

export default P_QuizQuestions;




/*for backend: 
{
  "question": "Who currently holds the record for most Grammy awards ever?",
  "options": [
  /{ "id": 1, "text": "Stevie Nicks" },
    { "id": 2, "text": "Taylor Swift" },
    { "id": 3, "text": "Beyonce" },
    { "id": 4, "text": "Adele" }
  ]
}*/

/*more backend
const express = require("express");
const app = express();

// Mock database question
const question = {
  question: "Who currently holds the record for most Grammy awards ever?",
  options: [
    { id: 1, text: "Stevie Nicks" },
    { id: 2, text: "Taylor Swift" },
    { id: 3, text: "Beyonce" },
    { id: 4, text: "Adele" },
  ],
};

// API endpoint to return the question
app.get("/api/question", (req, res) => {
  res.json(question);
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});*/