import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ViewShopOwners.css'

const ViewShopOwners = () => {
  const [shopOwners, setShopOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchShopOwners();
  }, []);

  const fetchShopOwners = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/shopowners');
      if (!response.ok) {
        throw new Error('Failed to fetch shop owners');
      }
      const data = await response.json();
      setShopOwners(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching shop owners:', err);
      setError('Failed to load shop owners. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading shop owners...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="view-shop-owners-container">
      <h1>Shop Owners</h1>
      {shopOwners.length === 0 ? (
        <p>No shop owners found.</p>
      ) : (
        <table className="shop-owners-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Shop</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopOwners.map((owner) => (
              <tr key={owner._id}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.contact}</td>
                <td>{owner.shop ? owner.shop.name : 'N/A'}</td>
                <td>
                  <Link to={`/admin/edit-shopowner/${owner._id}`}>Edit</Link>
                  {' | '}
                  <button onClick={() => handleDelete(owner._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/admin/add-shopowner" className="add-shop-owner-button">
        Add New Shop Owner
      </Link>
    </div>
  );

  async function handleDelete(ownerId) {
    if (window.confirm('Are you sure you want to delete this shop owner?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/shopowners/${ownerId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete shop owner');
        }
        // Remove the deleted shop owner from the state
        setShopOwners(shopOwners.filter(owner => owner._id !== ownerId));
      } catch (err) {
        console.error('Error deleting shop owner:', err);
        alert('Failed to delete shop owner. Please try again.');
      }
    }
  }
};

export default ViewShopOwners;