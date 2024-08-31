import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };


  return (
    <div className="Header">
      <div className="mallname">ABC MALL</div>
      <div className="buttons">
        <button className="btn" onClick={handleLoginClick}>Login/Signup</button>
      </div>
    </div>
  );
};

export default Header;
