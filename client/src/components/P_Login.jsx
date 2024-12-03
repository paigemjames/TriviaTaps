import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const P_Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5050/participants/login', {
        userEmail,
        password,
      });

      // store the email in localStorage after successful login
      localStorage.setItem('userEmail', userEmail);
      
      setMessage(response.data.message);
      
      setTimeout(() => {
        navigate('/ParticipantQuizSelection');
      }, 1000);
      
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Error during login');
      } else {
        setMessage('Network error, please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Participant Login</h2>
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
        {message && <p className="message">{message}</p>}
      </div>
      
      <div className="signup-link-container">
        <p className="signup-link-text">Need an account?{' '}
          <Link to="/ParticipantSignUp" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default P_Login;
