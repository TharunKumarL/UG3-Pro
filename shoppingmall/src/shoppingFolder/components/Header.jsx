import React from 'react';
import '../components/css/Header.css';  // Import the CSS file

const Header = () => {
  return (
    <header className="mall-header">
      <div className="logo">Shopping Mall</div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/shops">Shops</a>
        <a href="/deals">Deals</a>
        <a href="/events">Events</a>
        <a href="/contact">Contact Us</a>
      </nav>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    </header>
  );
};

export default Header;
