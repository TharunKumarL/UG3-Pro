import React, { useState } from 'react';
import '../css/AddDeals.css'

const AddDeals = () => {
  const [dealData, setDealData] = useState({
    store: '',
    description: '',
    expiration: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDealData({ ...dealData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/shopowner/add-deal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`, // Include token if necessary
        },
        body: JSON.stringify(dealData),
      });

      if (!response.ok) {
        throw new Error('Failed to add deal');
      }

      const result = await response.json();
      console.log('Deal added:', result);
      // Reset form or show success message here
      setDealData({
        store: '',
        description: '',
        expiration: '',
        image: '',
      });
    } catch (error) {
      console.error('Error adding deal:', error);
    }
  };

  return (
    <div>
      <h1>Add Deal</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="store"
          placeholder="Store Name"
          value={dealData.store}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={dealData.description}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="expiration"
          placeholder="Expiration Date"
          value={dealData.expiration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={dealData.image}
          onChange={handleChange}
        />
        <button type="submit">Add Deal</button>
      </form>
    </div>
  );
};

export default AddDeals;
