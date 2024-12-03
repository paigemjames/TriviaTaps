import React, { useState } from "react";
import "../index.css";

const A_QuizManagement = () => {
  const [category, setCategory] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);

  const handleAddQuestion = () => {
    const question = {
      question: newQuestion,
      options: newOptions.map((text, index) => ({ id: index + 1, text })),
    };
    setQuestions([...questions, question]);
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
  };

  const handleSubmitQuiz = async () => {
    const quiz = { category, title: quizTitle, questions };
    try {
      const response = await fetch("/api/admin/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });
      if (!response.ok) throw new Error("Failed to create quiz");
      alert("Quiz created successfully!");
      setCategory("");
      setQuizTitle("");
      setQuestions([]);
    } catch (error) {
      console.error("Error creating quiz:", error.message);
    }
  };

  return (
    <div className="create-quiz-page">
      <h1 className="form-heading">Admin - Create Quiz</h1>
      <input
        type="text"
        placeholder="Category"
        className="quiz-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quiz Title"
        className="quiz-input"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <div className="question-card">
        <input
          type="text"
          placeholder="Question"
          className="quiz-input"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />
        {newOptions.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            className="quiz-input"
            value={option}
            onChange={(e) =>
              setNewOptions((prev) =>
                prev.map((opt, i) => (i === index ? e.target.value : opt))
              )
            }
          />
        ))}
        <button className="add-button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
      <button className="create-button" onClick={handleSubmitQuiz}>
        Submit Quiz
      </button>
    </div>
  );
};

export default A_QuizManagement;
