import React, { useEffect } from "react";
import '../index.css';

const P_QuizCatagories = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Quiz Catagories";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant - Quiz Catagories</h1>
    </div>
  );
};

export default P_QuizCatagories;
