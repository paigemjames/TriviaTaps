import React, { useState } from "react";
import "../index.css";

const A_ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories(categories.filter((category) => category !== categoryToDelete));
  };

  return (
    <div className="manage-categories">
      <h1 className="admin-title">Manage Categories</h1>
      <div className="category-input-container">
        <input
          type="text"
          className="category-input"
          placeholder="Enter new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="add-category-button" onClick={handleAddCategory}>
          Add
        </button>
      </div>
      <ul className="category-list">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            {category}
            <button
              className="delete-category-button"
              onClick={() => handleDeleteCategory(category)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default A_ManageCategories;
