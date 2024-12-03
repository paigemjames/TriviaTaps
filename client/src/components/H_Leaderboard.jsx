import React, { useEffect, useState } from "react";
import "../index.css";
import H_Navbar from "./H_Navbar";

const H_Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [highestScore, setHighestScore] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [announcementConfirmed, setAnnouncementConfirmed] = useState(false);

  useEffect(() => {
    document.title = "Trivia Taps - Host Leaderboard";

    // Fetch all leaderboard data
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("http://localhost:5050/scores"); // Correct endpoint for all scores
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error.message);
      }
    };

    // Fetch the highest score
    const fetchHighestScore = async () => {
      try {
        const response = await fetch("http://localhost:5050/scores/highest"); // Correct endpoint for the highest score
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setHighestScore(data);
      } catch (error) {
        console.error("Error fetching highest score:", error.message);
      }
    };

    fetchLeaderboardData();
    fetchHighestScore();
  }, []);

  // Function to handle confirming the winner announcement
  const handleAnnounceWinner = () => {
    setShowPopup(true);
  };

  // Function to confirm the announcement
  const confirmAnnouncement = () => {
    setAnnouncementConfirmed(true);
    setShowPopup(false);
    console.log(`Winner announced: ${highestScore.username} with score: ${highestScore.score}`);
    // You can add further logic here to announce the winner to all players
  };

  // Function to cancel the announcement
  const cancelAnnouncement = () => {
    setShowPopup(false);
  };

  return (
    <div className="shared-screen">
      <H_Navbar />
      <div className="yellow-text">
        <h1>Leaderboard</h1>
        {highestScore ? (
          <div className="highlight">
            <h2>Top Player: {highestScore.username}</h2>
            <p>Score: {highestScore.score}</p>
            <button onClick={handleAnnounceWinner}>Announce Winner</button>
            {announcementConfirmed && <p>The winner has been announced!</p>}
          </div>
        ) : (
          <p>Loading top player...</p>
        )}

        {leaderboardData.length > 0 ? (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((player, index) => (
                <tr key={player._id}>
                  <td>{index + 1}</td>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading leaderboard...</p>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Do you want to announce {highestScore.username} as the winner to all players?</h3>
            <button onClick={confirmAnnouncement}>Yes</button>
            <button onClick={cancelAnnouncement}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default H_Leaderboard;
