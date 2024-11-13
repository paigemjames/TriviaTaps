import React, { useEffect } from "react";
import '../index.css';

const H_QuizStart = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz Start";
  }, []);

  return (
    <div className="shared-screen"></div>
  );
};

export default H_QuizStart;
