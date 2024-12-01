import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import '../index.css';
import H_Navbar from './H_Navbar';

const H_QuestionRelease = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizId = location.state?.quizId;
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    document.title = "Trivia Taps - Question Release";
    
    if (!quizId) {
      navigate('/HostQuizSelection');
      return;
    }

    fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5050/quizzes/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleReleaseQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleEndQuiz = () => {
    navigate('/HostQuizEnd');
  };

  return (
    <div className="shared-screen">
      <div className="header">
        <h1>Trivia Taps</h1>
        {quiz && (
          <h2>{quiz.title}</h2>
        )}
      </div>

      <div className="question-release-container">
        {quiz && (
          <>
            <div className="progress-info">
              <p>Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
            </div>

            <div className="current-question">
              {currentQuestionIndex < quiz.questions.length ? (
                <div className="question-display">
                  <h3>Current Question:</h3>
                  <p>{quiz.questions[currentQuestionIndex].questionText}</p>
                </div>
              ) : (
                <div className="quiz-complete">
                  <h3>All questions have been released!</h3>
                  <button onClick={handleEndQuiz}>End Quiz</button>
                </div>
              )}
            </div>

            {currentQuestionIndex < quiz.questions.length && (
              <button 
                className="release-button"
                onClick={handleReleaseQuestion}
              >
                Release Next Question
              </button>
            )}
          </>
        )}
      </div>
      
      <H_Navbar />
    </div>
  );
};

export default H_QuestionRelease;
