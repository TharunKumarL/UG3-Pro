import React, { useState, useEffect } from 'react';

const ViewShops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/shops')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched shops:', data);
        if (Array.isArray(data)) {
          setShops(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      })
      .catch(error => {
        console.error('Error fetching shops:', error);
      });
  }, []);

  return (
    <div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shops.length === 0 ? (
        <p>No shops available.</p>
      ) : (
        shops.map(shop => (
          <div key={shop._id} className="shop-item">
            <img src={shop.image} alt={shop.name} className="shop-image" />
            <div className="shop-info">
              <h2>{shop.name}</h2>
              <p>{shop.location}</p>
              {shop.contact && <p>{shop.contact}</p>}
              <button>Details</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewShops;
