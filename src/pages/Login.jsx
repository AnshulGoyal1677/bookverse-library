import React from 'react';

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to BookVerse</h2>
        <p className="auth-subtitle">Enter your credentials to access your account</p>

        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-btn">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;