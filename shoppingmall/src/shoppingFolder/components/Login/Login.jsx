import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

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
        
        // Decode the token to get user role
        const decodedToken = jwtDecode(data.token);
        const userRole = decodedToken.role; // Assuming the role is included in the token
        localStorage.setItem('user', JSON.stringify(decodedToken));

        // Redirect the user based on role
        console.log('userrole'+userRole)
        if (userRole == 'admin') {
          navigate('/admin/dashboard'); // Redirect admin to the dashboard

        }
        else if(userRole=='sportsmanager'){
          navigate('/sport/owner')
        } 
        else {
          navigate('/'); // Redirect regular users to home
        }
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
