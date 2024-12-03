
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css'; // Import the CSS file for styling

const  A_Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/admins/login', {
        userEmail,
        password,
      });

      setMessage(response.data.message);  // Show the success message
    //     setTimeout(() => {
    //     navigate('/'); // Redirect to quiz selection page
    //  }, 1000); // Adjust delay as needed (e.g., 1 seconds to show the message) */
    } catch (error) {
      // Handle errors
      if (error.response) {
        setMessage(error.response.data.message || 'Error during login');
      } else {
        setMessage('Network error, please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Admin Login</h2>
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

        <button type="submit" className="submit-button">Login</button>
      </form>

      <div className="message-container">
        {message && <p className="message">{message}</p>} {/* Display success or error message */}
      </div>
      
      <div className="signup-link-container">
        <p className="signup-link-text">Need an account?{' '}
          <Link to ="/AdminSignUp" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default A_Login;
