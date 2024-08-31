import React from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'; // Import the CSS file

const Signup = () => {
  return (
    <div className="Signup">
      <div className="wrapper">
        <h1>Signup</h1>
        <form action="/signup" method="POST">
          <div className="input-group">
            <div className="input-box">
              <input type="text" name="name" placeholder="Name" required />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input type="email" name="email" placeholder="Email" required />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input type="password" name="password" placeholder="Password" required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box">
              <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className="signupButton">Sign Up</button>
          </div>
        </form>
        <div className="already-have-account">
          <p>Already have an account?</p>
          <Link to="/login" className="signupButton">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
