import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import P_Navbar from './P_Navbar';

function P_QuizQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/quizzes/${quizId}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitQuiz = () => {
    console.log('Quiz submitted!');
  };

  if (loading) return (
    <div className="quiz-container">
      <h1 className="quiz-title">Loading...</h1>
      <P_Navbar />
    </div>
  );
  
  if (!quiz) return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz not found</h1>
      <P_Navbar />
    </div>
  );

  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1 className="quiz-title">{quiz.title}</h1>
      </div>

      <div className="quiz-content">
        <div className="question-info">
          <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          <span className="category">Category: {quiz.category}</span>
        </div>

        {quiz.questions && quiz.questions[currentQuestion] && (
          <>
            <div className="question-text">
              {quiz.questions[currentQuestion].questionText}
            </div>
            
            <div className="options-container">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => {
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="navigation-buttons">
              {isLastQuestion ? (
                <button
                  className="submit-button"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <P_Navbar />
    </div>
  );
}

export default P_QuizQuestion;
