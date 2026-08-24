import React, { useState } from 'react';

function Login({ onSwitch, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError('');
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      alert('Error: Please fill in both email and password.');
      setError('Please fill in both email and password.');
      return;
    }

    if (!validateEmail(formData.email)) {
      alert('Error: Please enter a valid email format.');
      setError('Please enter a valid email address.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('bookverse_users') || '[]');
    const matchedUser = existingUsers.find(
      (u) => u.email === formData.email.toLowerCase().trim() && u.password === formData.password
    );

    if (!matchedUser) {
      alert('Error: Invalid email or password.');
      setError('Invalid email or password.');
      return;
    }

    localStorage.setItem('bookverse_session', JSON.stringify({ name: matchedUser.name, email: matchedUser.email }));
    alert(`Welcome back, ${matchedUser.name}! Login successful.`);
    
    if (onLoginSuccess) {
      onLoginSuccess(matchedUser);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to BookVerse</h2>
        <p className="auth-subtitle">Enter your credentials to access your account</p>

        {error && <div className="auth-alert error-alert">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <a
            href="#signup"
            onClick={(e) => {
              e.preventDefault();
              onSwitch('signup');
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;