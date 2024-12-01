import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import H_Navbar from './H_Navbar';

const H_QuizStart = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This gets the quiz ID from the URL
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz";
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/quizzes/${id}`);
      setQuiz(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError('Failed to load quiz details');
      setLoading(false);
    }
  };

  const handleStartQuiz = () => {
    navigate('/HostQuestionRelease', { state: { quizId: id } });
  };

  if (loading) {
    return (
      <div className="host-quiz-start-container">
        <p className="loading-text">Loading quiz details...</p>
        <H_Navbar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="host-quiz-start-container">
        <p className="error-text">{error}</p>
        <H_Navbar />
      </div>
    );
  }

  return (
    <div className="host-quiz-start-container">
      <div className="quiz-details">
        <h2>{quiz?.title}</h2>
        <p className="category">Category: {quiz?.category}</p>
        <p className="question-count">
          Number of Questions: {quiz?.questions?.length || 0}
        </p>
        
        <div className="questions-preview">
          <h3>Questions Preview:</h3>
          {quiz?.questions?.map((question, index) => (
            <div key={index} className="question-preview-item">
              <p className="question-number">Question {index + 1}:</p>
              <p className="question-text">{question.questionText}</p>
            </div>
          ))}
        </div>

        <button 
          className="start-quiz-btn"
          onClick={handleStartQuiz}
        >
          Start Hosting Quiz
        </button>
      </div>
      
      <H_Navbar />
    </div>
  );
};

export default H_QuizStart;
