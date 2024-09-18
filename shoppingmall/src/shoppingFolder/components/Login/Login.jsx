import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // To navigate after login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in JSON format
      });

      const data = await response.json();
      if (response.ok && data.token) {
        // Save the token in sessionStorage (or localStorage if you prefer)
        sessionStorage.setItem('token', data.token);
        // Redirect the user to the home page after successful login
        navigate('/');
      } else {
        // Handle login error (e.g., invalid credentials)
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <div className="Login">
      <div className="wrapper">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                required
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                required
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="remember">
              <label><input type="checkbox" /> Remember me</label>
              <a href="/forgotpassword">Forgot password?</a>
            </div>
            <button type="submit" className="loginButton">Login Now</button>
          </div>
        </form>
        <div className="registration">
          <p>Don't have an account?</p>
          <Link to="/signup" className="loginButton">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
