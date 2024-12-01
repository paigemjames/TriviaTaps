import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import H_Navbar from './H_Navbar';
import '../index.css';

const H_CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: '',
    category: '',
    questions: [{
      questionText: '',
      options: ['', '', '', ''],
      correctOption: 0
    }]
  });

  const handleQuizDataChange = (e) => {
    setQuizData({
      ...quizData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    const updatedQuestions = [...quizData.questions];
    if (field === 'options') {
      updatedQuestions[questionIndex].options[value.index] = value.text;
    } else {
      updatedQuestions[questionIndex][field] = value;
    }
    setQuizData({
      ...quizData,
      questions: updatedQuestions
    });
  };

  const handleAddQuestion = () => {
    if (quizData.questions.length < 10) {
      setQuizData({
        ...quizData,
        questions: [...quizData.questions, {
          questionText: '',
          options: ['', '', '', ''],
          correctOption: 0
        }]
      });
    } else {
      alert('Maximum 10 questions allowed');
    }
  };

  const handleRemoveQuestion = (indexToRemove) => {
    if (quizData.questions.length > 1) {
      setQuizData({
        ...quizData,
        questions: quizData.questions.filter((_, index) => index !== indexToRemove)
      });
    }
  };

  const validateQuiz = () => {
    if (!quizData.title.trim() || !quizData.category.trim()) {
      alert('Please fill in the quiz title and category');
      return false;
    }

    for (let i = 0; i < quizData.questions.length; i++) {
      const question = quizData.questions[i];
      if (!question.questionText.trim()) {
        alert(`Please fill in the question text for question ${i + 1}`);
        return false;
      }

      for (let j = 0; j < question.options.length; j++) {
        if (!question.options[j].trim()) {
          alert(`Please fill in all options for question ${i + 1}`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateQuiz()) {
      return;
    }

    try {
      await axios.post('http://localhost:5050/quizzes', quizData);
      navigate('/HostQuizSelection');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div className="create-quiz-page">
      <div className="quiz-form-container">
      <div className="form-heading">Create New Quiz</div>
        
        <div className="quiz-basic-info">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={quizData.title}
            onChange={handleQuizDataChange}
            className="quiz-input"
          />
          
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={quizData.category}
            onChange={handleQuizDataChange}
            className="quiz-input"
          />
        </div>

        {quizData.questions.map((question, qIndex) => (
          <div key={qIndex} className="question-card">
            <div className="question-header">
              <h3 className="question-title">Question {qIndex + 1}</h3>
              {quizData.questions.length > 1 && (
                <button 
                  className="remove-question-btn"
                  onClick={() => handleRemoveQuestion(qIndex)}
                >
                  Remove Question
                </button>
              )}
            </div>
            
            <input
              type="text"
              placeholder="Question Text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              className="question-input"
            />

            <div className="options-container">
              {[0, 1, 2, 3].map((oIndex) => (
                <div key={oIndex} className="option-input">
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={question.options[oIndex]}
                    onChange={(e) => handleQuestionChange(qIndex, 'options', {
                      index: oIndex,
                      text: e.target.value
                    })}
                    className="option-text-input"
                  />
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={question.correctOption === oIndex}
                    onChange={() => handleQuestionChange(qIndex, 'correctOption', oIndex)}
                    className="option-radio"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="action-buttons">
          <button 
            onClick={handleAddQuestion} 
            className="add-button"
            disabled={quizData.questions.length >= 10}
          >
            Add Question
          </button>

          <button onClick={handleSubmit} className="create-button">
            Create Quiz
          </button>
        </div>
      </div>
      <H_Navbar />
    </div>
  );
};

export default H_CreateQuiz;
