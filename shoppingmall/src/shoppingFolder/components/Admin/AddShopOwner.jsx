import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddShopOwner = () => {
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shops');
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setShops(data);
      } else {
        throw new Error('Expected an array of shops');
      }
    } catch (error) {
      console.error('Error fetching shops:', error);
      setError('Failed to load shops. Please try again later.');
    }
  };

  const handleAddShopOwner = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/add-shopowners/${shopId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, contact }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add shop owner');
      }

      alert('Shop owner added successfully!');
      navigate('/admin/view-shopowners');
    } catch (error) {
      console.error('Error adding shop owner:', error);
      setError(error.message || 'An error occurred while adding the shop owner.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="add-shop-owner-container">
      <h1>Add Shop Owner</h1>
      <form onSubmit={handleAddShopOwner}>
        <div>
          <label htmlFor="shop-select">Select Shop:</label>
          <select 
            id="shop-select"
            value={shopId} 
            onChange={(e) => setShopId(e.target.value)} 
            required
          >
            <option value="">Select a shop</option>
            {shops.map(shop => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name-input">Name:</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contact-input">Contact:</label>
          <input
            id="contact-input"
            type="tel"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Shop Owner'}
        </button>
      </form>
    </div>
  );
};

export default AddShopOwner;