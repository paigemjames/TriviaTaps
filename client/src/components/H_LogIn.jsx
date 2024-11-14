import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

// handles login form for bar hosts
const H_Login = () => {
  // stores form data and loading state
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // sends login info to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5050/hosts/login', {
        userEmail,
        password,
      });

      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/HostQuizSelection'); 
      }, 1000);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'Error during login');
      } else {
        setMessage('Network error, please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // shows login form
  return (
    <div className="signup-container">
      <h2 className="signup-title">Host Login</h2>
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="message-container">
        {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
      </div>
      
      <div className="signup-link-container">
        <p className="signup-link-text">
          Need a host account?{' '}
          <Link to="/HostSignUp" className="signup-link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default H_Login;
