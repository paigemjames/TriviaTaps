import React, { useEffect } from "react";
import '../index.css';

const H_LogOut = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Host Logout";
  }, []);

  return (
    <div className="shared-screen">
      {/* For now, nothing else on the screen */}
    </div>
  );
};

export default H_LogOut;
