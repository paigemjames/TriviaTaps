import React, { useEffect } from "react";
import '../index.css';

const H_QuizEnd = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz End";
  }, []);

  return (
    <div className="shared-screen"></div>
  );
};

export default H_QuizEnd;
