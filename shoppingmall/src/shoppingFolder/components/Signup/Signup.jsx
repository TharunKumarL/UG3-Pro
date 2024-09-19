import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log('Signup response:', data);
        alert('Signup successful!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        alert(`Signup failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('An error occurred during signup.');
    }
    
  };
  

  return (
    <div className="Signup">
      <div className="wrapper">
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
          <div className="input-group">
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" className="signupButton">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;