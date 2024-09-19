import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/UpdateShopDetail.css'; // Import the CSS file
import Shop from '../../../models/Shop';

const UpdateShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch shop details from the server
    fetch(`http://localhost:5000/api/admin/shops/${id}`)
      .then(response => response.json())
      .then(data => {
        setShop(data);
        setLocation(data.location);
        setContact(data.contact);
      })
      .catch(error => console.error('Error fetching shop:', error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:5000/api/shops/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, contact }),
      });
  
      if (response.ok) {
        alert('Shop updated successfully!');
        navigate('/admin/update-shop');
      } else {
        const errorData = await response.json();
        alert(`Update failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('An error occurred during update.');
    }
  };
  

  if (!shop) return <div>Loading...</div>;

  return (
    <div className="update-shop-container">
      <h1>Update Shop</h1>
      <div>

        </div>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <button type="submit">Update Shop</button>
      </form>
    </div>
  );
};

export default UpdateShopDetail;
