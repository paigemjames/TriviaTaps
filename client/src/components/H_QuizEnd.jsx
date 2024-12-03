// import React, { useEffect } from "react";
// import '../index.css';
// import H_Navbar from "./H_Navbar";
// import { Link, useNavigate } from 'react-router-dom';
// import Taps from '../assets/taps.png'; 

// const H_QuizEnd = () => {
//   useEffect(() => {
//     document.title = "Trivia Taps - Host Quiz End";
//   }, []);

//   return (
//     <div className="shared-screen">
     
//       <div className="yellow-text">
//         Quiz Catagory Here 
//       </div>
//       <div className="yellow-text">
//         That is the last question!
//       </div>
// {/* THIS WILL NEED TO CHANGE  */}
//       <div className="image-container">
//         <Link to="/ParticipantLeaderboard"> 
//           <img src={Taps} alt="Trivia" className="center-image" />
//         </Link>
//       </div>
      
//       <p>Click the drinks to close the quiz for all users!</p>
//       <div className="role-buttons">
//         <Link to="/HostGameStats" className="role-button">Game Stats</Link>
//         <Link to="/HostLeaderboard" className="role-button">View Leaderboard</Link>

//       </div>
//       <H_Navbar />
//     </div>
//   );
// };

// export default H_QuizEnd;
import React, { useEffect, useState } from "react";
import '../index.css';
import H_Navbar from "./H_Navbar";
import { Link, useNavigate } from 'react-router-dom';
import Taps from '../assets/taps.png';

const H_QuizEnd = () => {
  const [quizEnded, setQuizEnded] = useState(false); // State to track if the quiz has ended
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Trivia Taps - Host Quiz End";
  }, []);

  // Function to handle quiz end
  const handleEndQuiz = async () => {
    // Set quizEnded state to true to indicate the quiz is over
    setQuizEnded(true);

    // Perform any actions needed when the quiz ends (e.g., API call to mark quiz as ended)
    try {
      const response = await fetch("http://localhost:5050/quiz/end", { method: 'POST' });
      if (!response.ok) {
        throw new Error('Error ending the quiz');
      }
      console.log("Quiz has ended successfully!");
    } catch (error) {
      console.error("Error ending the quiz:", error.message);
    }

    // Redirect to the ParticipantLeaderboard or any other page you'd like
    setTimeout(() => {
      navigate("/HostQuizSelection");
    }, 5000); // Delay the navigation slightly for a smooth experience
  };

  return (
    <div className="shared-screen">
      <div className="yellow-text">
        Quiz Category Here
      </div>
      <div className="yellow-text">
        That is the last question!
      </div>

      {/* Click the drink to end the quiz */}
      <div className="image-container">
        {!quizEnded ? (
          <img
            src={Taps}
            alt="Trivia"
            className="center-image"
            onClick={handleEndQuiz}
            style={{ cursor: 'pointer' }} // Show pointer cursor to indicate it's clickable
          />
        ) : (
          <p>Quiz has ended!</p> // Display message when the quiz is over
        )}
      </div>

      <p>Click the drinks to close the quiz for all users!</p>
      <div className="role-buttons">
        <Link to="/HostGameStats" className="role-button">Game Stats</Link>
        <Link to="/HostLeaderboard" className="role-button">View Leaderboard</Link>
      </div>
      <H_Navbar />
    </div>
  );
};

export default H_QuizEnd;
