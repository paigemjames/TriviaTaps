import React, { useEffect } from "react";
import '../index.css';

const H_QuestionRelease = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Question Release";
  }, []);

  return (
    <div className="shared-screen">
      {/* For now, nothing else on the screen */}
    </div>
  );
};

export default H_QuestionRelease;
