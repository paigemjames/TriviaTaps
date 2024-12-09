import React, { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "../index.css";
import P_Navbar from "./P_Navbar";

const P_QuizSubmit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { responses, quizData } = location.state || {};

  useEffect(() => {
    document.title = "Trivia Taps - Quiz Results";
    if (!quizData || !responses) {
      console.error("Missing quiz data or responses. Redirecting...");
      navigate("/ParticipantQuizSelection");
    }
  }, [navigate, quizData, responses]);

  const calculateScore = () => {
    if (!quizData || !quizData.questions) return 0;
    return quizData.questions.reduce((score, question) => {
      const correctAnswer = question.correctAnswer; // Ensure `correctAnswer` exists
      return responses[question._id] === correctAnswer ? score + 1 : score;
    }, 0);
  };

  if (!quizData || !responses) return null;

  const score = calculateScore();

  return (
    <div className="shared-screen">
      <div className="header">
        <h1 className="quiz-results-title">Quiz Results</h1>
      </div>

      <h2 className="quiz-score">Your Score: {score} / {quizData.questions.length}</h2>

      <table className="results-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Your Answer</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          {quizData.questions.map((question) => (
            <tr key={question._id}>
              <td>{question.questionText}</td>
              <td>{responses[question._id] || "Not Answered"}</td>
              <td>{question.correctAnswer || "Not Provided"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="yellow-text">
        That's the last question!
      </div>

      <div className="image-container">
        <Link to="/ParticipantLeaderboard">
          <img src="/assets/taps.png" alt="Trivia" className="center-image" />
        </Link>
      </div>
      
      <p>Click the drinks to submit your quiz and view the leaderboard!</p>

      <P_Navbar />
    </div>
  );
};

export default P_QuizSubmit;
