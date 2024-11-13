import React, { useEffect } from "react";
import '../index.css';
import H_Navbar from "./H_Navbar";

const H_LogIn = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Login";
  }, []);

  return (
    <div className="shared-screen">
      <h1>Host - Login</h1>
      <H_Navbar />
    </div>
  );
};

export default H_LogIn;