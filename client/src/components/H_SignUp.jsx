import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';

// handles signup form for bar hosts
function HSignup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  // stores form data as user types
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    barName: '',
    password: '',
    confirmPassword: ''
  });

  // updates form data when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // sends form data to server
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // checks if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/hosts/signup', {
        userName: formData.name,
        userEmail: formData.email,
        password: formData.password,
        barName: formData.barName
      });

      if (response.data.success) {
        navigate('/HostLogin');
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error during signup');
      console.error('Signup error:', err);
    }
  };

  // displays the signup form
  return (
    <div className="signup-container">
      <h1 className="signup-title">Host Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Bar Name:</label>
          <input
            className="form-input"
            type="text"
            name="barName"
            value={formData.barName}
            onChange={handleChange}
            required
            placeholder="Enter bar name"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Confirm Password:</label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm password"
          />
        </div>
        <button className="submit-button" type="submit">Sign Up</button>
        {error && <div className="message">{error}</div>}
      </form>
      <div className="login-link">
      Already have an account? <a href="/HostLogin">Login here</a>
      </div>
    </div>
  );
}

export default HSignup;
