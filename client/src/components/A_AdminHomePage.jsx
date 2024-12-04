import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; // Import CSS for styling

const A_AdminHomePage = () => {
  return (
    <div className="admin-home">
      <h1 className="admin-title">Welcome, Admin!</h1>
      <p className="admin-subtitle">What would you like to do today?</p>

      <div className="admin-options">
        {/* Link to manage categories */}
        <Link to="/ManageCategories" className="admin-link">
          <button className="admin-button">Manage Categories</button>
        </Link>

        {/* Link to upload new quizzes */}
        <Link to="/UploadQuiz" className="admin-link">
          <button className="admin-button">Upload New Quiz</button>
        </Link>

        {/* Additional admin features */}
        <Link to="/ViewStats" className="admin-link">
          <button className="admin-button">View Quiz Stats</button>
        </Link>
      </div>
    </div>
  );
};

export default A_AdminHomePage;
