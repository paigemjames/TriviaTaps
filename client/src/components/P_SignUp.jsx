
import '../index.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const P_SignUp = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/users/signup', {
        userEmail,
        password,
      });

      setMessage(response.data.message);  // Show the success message

      // Check if response has success flag
      if (response.data.success) {
        // Delay redirection to show the message briefly
        setTimeout(() => {
          navigate('/ParticipantLogin'); // Redirect to login page after a successful sign-up
        }, 1000); // 1-second delay for user to read the message
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        setMessage(error.response.data.message || 'Error during sign-up');
      } else {
        setMessage('Error during sign-up');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">Sign Up</button>
      </form>

      <div className="message-container">
        {message && <p className="message">{message}</p>} {/* Display success or error message */}
      </div>
    </div>
  );
};

export default P_SignUp;


