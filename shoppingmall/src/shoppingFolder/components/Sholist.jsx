import React, { useEffect, useState } from 'react';
import '../components/css/Shoplist.css';

function ShopsList() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Fetch shops from the backend
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        const data = await response.json();
        setShops(data); // Set shop data to state
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShops();
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
}

export default ShopsList;
