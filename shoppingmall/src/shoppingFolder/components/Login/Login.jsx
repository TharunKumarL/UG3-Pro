import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  return (
    <div className="Login">
      <div className="wrapper">
        <h1>Login</h1>
        <form action="/login" method="POST">
          <div className="input-group">
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" required />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="Password" required />
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
