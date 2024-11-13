import React, { useEffect } from "react";
import '../index.css';

const P_QuizQuestions = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Sign Up";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant - Quiz Questions</h1>
    </div>
  );
};

export default P_QuizQuestions;
