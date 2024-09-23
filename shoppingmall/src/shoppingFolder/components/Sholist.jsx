import React, { useEffect, useState } from 'react';
import '../components/css/Shoplist.css';
import mall from './images/background3.png';

function ShopsList() {
  const [shops, setShops] = useState([]);
  const [expandedShopId, setExpandedShopId] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        const data = await response.json();
        setShops(data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };
    fetchShops();
  }, []);

  const handleDetailsClick = (shopId) => {
    // Toggle details for the clicked shop
    setExpandedShopId(expandedShopId === shopId ? null : shopId);
  };

  return (
    <div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shops.map(shop => (
        <div key={shop._id} className="shop-item">
          <img src={mall} alt={shop.name} className="shop-image" />
          <div className="shop-info">
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            {shop.contact && <p>{shop.contact}</p>}
            <button onClick={() => handleDetailsClick(shop._id)}>Details</button>
          </div>
          {/* Toggle shop details below the shop item */}
          {expandedShopId === shop._id && (
            <div className="shop-details">
              <p>{shop.name} is located in {shop.location}. You can contact at {shop.contact}. Please Visit!</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ShopsList;
