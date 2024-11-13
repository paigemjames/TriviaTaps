import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Taps from './assets/taps.png'; 

const App = () => {
  useEffect(() => {
    document.title = "Trivia Taps - Home";
  }, []);

  return (
    <div className="body">
      <h1 style={{ color: '#ffffff' }}>Trivia Taps</h1>
      
      <div className="image-container">
        <Link to="/RoleSelection">
          <img src={Taps} alt="Trivia" className="center-image" />
        </Link>
      </div>
      <p>Clink the drinks together to get started!</p>
    </div>
  );
};

export default App;
