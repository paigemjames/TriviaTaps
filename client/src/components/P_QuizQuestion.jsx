import React, { useEffect } from "react";
import '../index.css';
import P_Navbar from "./P_Navbar";


const P_QuizQuestions = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Quiz Questions";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant Quiz Questions</h1>
      <P_Navbar />
    </div>
  );
};

export default P_QuizQuestions;