import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/Admin.css'; // Make sure to create and style this CSS file

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded admin credentials
    const adminEmail = 'tharunkumarlagisetty@gmail.com';
    const adminPassword = '123';

    if (email === adminEmail && password === adminPassword) {
      setError('');
      navigate('/admin-dashboard'); // Redirect to the admin dashboard
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="admin-container">
      <div className="login-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
