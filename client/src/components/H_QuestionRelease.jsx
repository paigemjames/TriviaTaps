import React, { useEffect } from "react";
import '../index.css';

const H_QuestionRelease = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Question Release";
  }, []);

  return (
    <div className="shared-screen">
      <div className="header"><h1>Trivia Taps</h1></div>
    </div>
  );
};

export default H_QuestionRelease;
