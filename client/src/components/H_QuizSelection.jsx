import React, { useEffect } from "react";
import '../index.css';

const H_QuizSelection = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz Selection";
  }, []);

  return (
    <div className="shared-screen"></div>
  );
};

export default H_QuizSelection;
