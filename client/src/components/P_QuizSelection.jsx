import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../index.css';
import P_Navbar from "./P_Navbar";

function P_QuizSelection() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joiningQuiz, setJoiningQuiz] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trivia Taps - Participant Quiz Selection";
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      navigate('/ParticipantLogin');
      return;
    }
    fetchQuizzes();
  }, [navigate]);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5050/quizzes");
      setQuizzes(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch quizzes");
      console.error('Error fetching quizzes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinQuiz = async (quizId, quiz) => {
    try {
      setJoiningQuiz(quizId);
      const userEmail = localStorage.getItem("userEmail");
      
      const joinUrl = `http://localhost:5050/quizzes/${quizId}/join`;
      
      const response = await axios.post(joinUrl, {
        userEmail
      });
  
      if (response.data.success) {
        navigate(`/quiz/${quizId}`);
      }
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'Failed to join quiz';
      setError(errorMessage);
    } finally {
      setJoiningQuiz(null);
    }
  };

  const categories = ['all', ...new Set(quizzes.map(quiz => quiz.category))];

  const filteredQuizzes = quizzes
    .filter(quiz => selectedCategory === 'all' || quiz.category === selectedCategory)
    .filter(quiz => 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (loading) return (
    <div className="shared-screen">
      <P_Navbar />
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">Loading quizzes...</div>
      </div>
    </div>
  );

  if (error) return (
    <div className="shared-screen">
      <P_Navbar />
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button className="retry-button" onClick={fetchQuizzes}>
          Retry Loading Quizzes
        </button>
      </div>
    </div>
  );

  return (
    <div className="shared-screen">
      <P_Navbar />
      <div className="quiz-selection-header">
        <h1>Available Quizzes</h1>
        <div className="quiz-filters">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="quiz-selection-container">
        {filteredQuizzes.length === 0 ? (
          <div className="no-quizzes-message">
            <p>No quizzes found matching your criteria</p>
            <button className="refresh-button" onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              fetchQuizzes();
            }}>
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="quiz-grid">
            {filteredQuizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card">
                <div className="quiz-info">
                  <h3>{quiz.title}</h3>
                  <div className="quiz-details">
                    <span className="category-tag">{quiz.category}</span>
                    <span className="question-count">
                      {quiz.questions?.length || 0} Questions
                    </span>
                  </div>
                  {quiz.participants && (
                    <div className="participant-info">
                      <i className="fas fa-users"></i>
                      <span>{quiz.participants.length} Joined</span>
                    </div>
                  )}
                </div>
                <button 
                  className={`join-button ${joiningQuiz === quiz._id ? 'joining' : ''}`}
                  onClick={() => handleJoinQuiz(quiz._id, quiz)}
                  disabled={joiningQuiz === quiz._id}
                >
                  {joiningQuiz === quiz._id ? 'Joining...' : 'Join Quiz'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default P_QuizSelection;
