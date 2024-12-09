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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [error, setError] = useState("");

  // Fetch quiz data on component mount
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/quizzes/${quizId}`);
        setQuiz(response.data);
      } catch (err) {
        setError("Failed to load the quiz. Please try again.");
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle selecting an answer for a question
  const handleAnswerSelect = (questionIndex, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  // Move to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  // Submit quiz and navigate to the results page
  const handleSubmitQuiz = () => {
    if (!quiz) {
      setError("Quiz data is missing. Please try reloading the page.");
      return;
    }
    navigate('/ParticipantQuizSubmit', {
      state: {
        responses: selectedAnswers,
        quizData: quiz,
      },
    });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">Loading...</h1>
        <P_Navbar />
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">Error</h1>
        <p>{error}</p>
        <P_Navbar />
      </div>
    );
  }

  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const currentAnswerSelected = selectedAnswers[currentQuestion];

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
                  className={`option-button ${
                    currentAnswerSelected === option ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswerSelect(currentQuestion, option)}
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
                  disabled={!currentAnswerSelected}
                >
                  Submit Quiz
                </button>
              ) : (
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                  disabled={!currentAnswerSelected}
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
