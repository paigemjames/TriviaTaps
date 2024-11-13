import React, { useEffect } from "react";
import '../index.css';

const P_QuizStart = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Quiz Start";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant - Quiz Start</h1>
    </div>
  );
};

export default P_QuizStart;