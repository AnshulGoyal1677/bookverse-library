import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login({ setCurrentUser }) {
  const navigate = useNavigate();

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
      setError('Please fill in both email and password.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('bookverse_users') || '[]');
    const matchedUser = existingUsers.find(
      (u) => u.email === formData.email.toLowerCase().trim() && u.password === formData.password
    );

    if (!matchedUser) {
      setError('Invalid email or password.');
      return;
    }

    const session = { name: matchedUser.name, email: matchedUser.email };
    localStorage.setItem('bookverse_session', JSON.stringify(session));

    setCurrentUser(session);
    navigate('/profile');
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

          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
