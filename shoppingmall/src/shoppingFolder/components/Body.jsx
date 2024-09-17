import React, { useState } from 'react'; 
import '../components/css/Body.css'; 

const Body = () => {

  return (
    <div className="mall-body">
      {/* Links for navigation */}
      <div className="section-link home" >
        <a href="home">Home</a>
      </div>
      <div className="section-link shops">
        <a href="shoplist">Shops</a>
      </div>
      <div className="section-link deals" >
        <a href="deals">Deals</a>
      </div>
      <div className="section-link events" >
        <a href="event">Events</a>
      </div>
    </div>
  );
};

export default Body;
