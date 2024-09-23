import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../components/css/Updateshop.css'; // Make sure to create and style this CSS file
import mall from '../images/background3.png';

const UpdateShop = () => {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all shops from the API
    fetch('http://localhost:5000/api/shops')
      .then(response => response.json())
      .then(data => setShops(data))
      .catch(error => console.error('Error fetching shops:', error));
  }, []);

  const handleUpdate = (shopId) => {
    // Navigate to the update shop page with the shopId
    navigate(`/admin/update-shop/${shopId}`);
  };

  return (
    <div className="shops-list">
      <h1>Stores & Restaurants</h1>
      {shops.map(shop => (
        <div key={shop._id} className="shop-item">
          {/* Shop image */}
          <img src={mall} alt={shop.name} className="shop-image" />
          {/* Shop details */}
          <div className="shop-info">
            <h2>{shop.name}</h2>
            <p>{shop.location}</p>
            {shop.contact && <p>{shop.contact}</p>}
            <button onClick={() => handleUpdate(shop._id)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateShop;
