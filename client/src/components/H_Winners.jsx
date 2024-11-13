import React, { useEffect } from "react";
import '../index.css';

const H_Winners = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Winners";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Host - Winners</h1>
    </div>
  );
};

export default H_Winners;
