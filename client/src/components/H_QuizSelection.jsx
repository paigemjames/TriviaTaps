import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../index.css';
import H_Navbar from "./H_Navbar";

const H_QuizSelection = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz Selection";
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5050/quizzes');
      setQuizzes(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      setError('Failed to load quizzes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSelect = (quizId) => {
    navigate(`/HostQuizStart/${quizId}`);
  };

  const handleCreateQuiz = () => {
    navigate('/HostCreateQuiz'); // Updated this line to match the new route
  };

  const handleDeleteQuiz = async (quizId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`http://localhost:5050/quizzes/${quizId}`);
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Failed to delete quiz. Please try again.');
    }
  };

  return (
    <div className="quiz-selection-container">
      <h2 className="section-title">Quiz Selection</h2>
      
      <div className="quiz-options">
        <button 
          className="create-quiz-btn"
          onClick={handleCreateQuiz}
        >
          Create New Quiz
        </button>

        {loading ? (
          <p className="status-message">Loading quizzes...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : quizzes.length === 0 ? (
          <p className="status-message">No quizzes available. Create one to get started!</p>
        ) : (
          <div className="quiz-list">
            {quizzes.map((quiz) => (
              <div 
                key={quiz._id} 
                className="quiz-card"
                onClick={() => handleQuizSelect(quiz._id)}
              >
                <h3>{quiz.title}</h3>
                <p>Category: {quiz.category}</p>
                <p>Questions: {quiz.questions?.length || 0}</p>
                <button
                  className="delete-quiz-btn"
                  onClick={(e) => handleDeleteQuiz(quiz._id, e)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <H_Navbar />
    </div>
  );
};

export default H_QuizSelection;
