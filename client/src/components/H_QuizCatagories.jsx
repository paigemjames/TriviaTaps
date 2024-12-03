import React, { useState, useEffect } from "react";
import "../index.css";

const H_QuizCategories = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz Categories";
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  return (
    <div className="shared-screen">
      <h1 className="section-title">Select Quiz Category</h1>
      <div className="quiz-options">
        {categories.map((category) => (
          <button
            key={category.id}
            className="role-button"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default H_QuizCategories;
