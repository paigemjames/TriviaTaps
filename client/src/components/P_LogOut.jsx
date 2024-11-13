import React, { useEffect } from "react";
import '../index.css';
import P_Navbar from "./P_Navbar";

const P_LogOut = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Log Out";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant - Log Out</h1>
    </div>
  );
};

export default P_LogOut;
