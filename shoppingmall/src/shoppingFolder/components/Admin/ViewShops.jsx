import React, { useState, useEffect } from 'react';

const ViewShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/shops')
      .then(response => response.json())
      .then(data => setShops(data))
      .catch(error => console.error('Error fetching shops:', error));
  }, []);

  return (
<div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shops.map(shop => (
        <div key={shop._id} className="shop-item">
          {/* Shop image */}
          <img src={shop.image} alt={shop.name} className="shop-image" />
          {/* Shop details */}
          <div className="shop-info">
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            {shop.contact && <p>{shop.contact}</p>}
            <button>Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewShops;
