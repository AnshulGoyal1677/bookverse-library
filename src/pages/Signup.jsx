import React, { useState } from 'react';

function Signup({ onSwitch }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      alert('Error: Please fill in all fields.');
      setError('Please fill in all fields.');
      return;
    }

    if (!validateEmail(formData.email)) {
      alert('Error: Please enter a valid email format (e.g. name@domain.com).');
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      alert('Error: Password must be at least 6 characters long.');
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Error: Passwords do not match.');
      setError('Passwords do not match.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('bookverse_users') || '[]');
    const userExists = existingUsers.some((u) => u.email.toLowerCase() === formData.email.toLowerCase().trim());

    if (userExists) {
      alert('Error: An account with this email already exists.');
      setError('An account with this email already exists.');
      return;
    }

    const newUser = {
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password
    };

    existingUsers.push(newUser);
    localStorage.setItem('bookverse_users', JSON.stringify(existingUsers));

    alert('Account created successfully! Click OK to go to Login.');
    onSwitch('login');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Join BookVerse</h2>
        <p className="auth-subtitle">Create your account to start borrowing books</p>

        {error && <div className="auth-alert error-alert">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <a
            href="#login"
            onClick={(e) => {
              e.preventDefault();
              onSwitch('login');
            }}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;