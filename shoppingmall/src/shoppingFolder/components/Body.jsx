import React, { useState } from 'react';
import ShopsList from './Sholist';  
import '../components/css/Body.css'; 

const Body = () => {
  const [currentSection, setCurrentSection] = useState('home'); // Track the current section

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  return (
    <div className="mall-body">
      {/* Links for navigation */}
      <div className="section-link home" onClick={() => handleSectionChange('home')}>
        <a href="#home">Home</a>
      </div>
      <div className="section-link shops" onClick={() => handleSectionChange('shops')}>
        <a href="#shops">Shops</a>
      </div>
      <div className="section-link deals" onClick={() => handleSectionChange('deals')}>
        <a href="#deals">Deals</a>
      </div>
      <div className="section-link events" onClick={() => handleSectionChange('events')}>
        <a href="#events">Events</a>
      </div>

      {/* Conditional Rendering of sections based on the current state */}
      <div className="section-content">
        {currentSection === 'home' && (
          <div className="home-section">
            <h1>Welcome to the Shopping Mall</h1>
          </div>
        )}
        {currentSection === 'shops' && <ShopsList />}  {/* Render ShopsList when 'shops' is selected */}
        {currentSection === 'deals' && (
          <div className="deals-section">
            <h1>Check out the latest deals</h1>
          </div>
        )}
        {currentSection === 'events' && (
          <div className="events-section">
            <h1>Upcoming events at the mall</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
