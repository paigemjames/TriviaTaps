import React, { useEffect } from "react";
import '../index.css';

const H_QuizCatagories = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz Categories";
  }, []);

  return (
    <div className="shared-screen">
      {/* Blank screen for now */}
    </div>
  );
};

export default H_QuizCatagories;
