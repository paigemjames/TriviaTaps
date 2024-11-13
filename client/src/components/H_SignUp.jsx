import React, { useEffect } from "react";
import '../index.css';

const H_SignUp = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Sign Up";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Host Sign Up</h1>
    </div>
  );
};

export default H_SignUp;
