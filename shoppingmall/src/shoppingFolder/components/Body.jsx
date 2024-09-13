import React from 'react';
import '../components/css/Body.css';  // Make sure the CSS file is imported

const Body = () => {
  return (
    <div className="mall-body">
      <div className="section-link home">
        <a href="/">Home</a>
      </div>
      <div className="section-link shops">
        <a href="/shoplist">Shops</a>
      </div>
      <div className="section-link deals">
        <a href="/deals">Deals</a>
      </div>
      <div className="section-link events">
        <a href="/events">Events</a>
      </div>
    </div>
  );
};

export default Body;
