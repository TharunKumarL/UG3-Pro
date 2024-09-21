import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/viewshopowners.css'

const ViewShopOwners = () => {
  const [shopOwners, setShopOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    } catch (error) {
      console.error('Error fetching shop owners:', error);
      setError('Failed to load shop owners. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (ownerId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this shop owner?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/shopowners/${ownerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete shop owner');
      }

      alert('Shop owner deleted successfully!');
      setShopOwners((prevOwners) => prevOwners.filter((owner) => owner._id !== ownerId));
    } catch (error) {
      console.error('Error deleting shop owner:', error);
      alert('Failed to delete shop owner. Please try again later.');
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
              <th>Shop Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shopOwners.map((owner) => (
              <tr key={owner._id}>
                <td>{owner.name}</td>
                <td>{owner.email}</td>
                <td>{owner.contact}</td>
                <td>{owner.shop.name}</td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/edit-shopowner/${owner._id}`)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(owner._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewShopOwners;
