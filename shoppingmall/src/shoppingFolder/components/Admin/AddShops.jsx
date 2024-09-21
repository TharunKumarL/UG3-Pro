import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddShops.css'; // Assuming you have a CSS file for styling

const AddShops = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleAddShop = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token'); // Get the JWT token

      const response = await fetch('http://localhost:5000/api/admin/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass token in headers
        },
        body: JSON.stringify({ name, location, contact, image }), // Send shop data in request body
      });

      if (response.ok) {
        const data = await response.json();
        alert('Shop added successfully!');
        navigate('/admin/view-shops'); // Redirect to view shops after adding
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData); // Log the error details for debugging
        alert(`Failed to add shop: ${errorData || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      alert('An error occurred while adding the shop.');
    }
  };

  return (
    <div className="add-shop-container">
      <h1>Add New Shop</h1>
      <form onSubmit={handleAddShop} className="add-shop-form">
        <div>
          <label>Shop Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="add-shop-btn">Add Shop</button>
      </form>
    </div>
  );
};

export default AddShops;
