import React, { useEffect } from "react";
import '../index.css';
import P_Navbar from "./P_Navbar";

const P_QuizSelection = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Quiz Selection";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant - Quiz Selection</h1>
    </div>
  );
};

export default P_QuizSelection;
