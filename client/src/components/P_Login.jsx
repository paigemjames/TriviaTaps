import React, { useEffect } from "react";
import '../index.css';
import P_Navbar from "./P_Navbar";

const P_Login = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Participant Login";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Participant - Login</h1>
      <P_Navbar />
    </div>
  );
};

export default P_Login;
