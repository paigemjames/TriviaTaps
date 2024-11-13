import React, { useEffect } from "react";
import "./index.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const App = () => {

  useEffect(() => {
    document.title = "Trivia Taps - Home";
  }, []);

  return (
    <div className="body">
      <h1>Trivia Taps</h1>
      <div className="rounded-container">
        {/* Add everything else here */}
        <p>Welcome to Trivia Taps! Select a category to start playing.</p>
      </div>
    </div>
  );
};

export default App;