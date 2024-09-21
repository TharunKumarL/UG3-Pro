import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ShopOwnerDashboard.css'; // Assuming you have a CSS file for styling

const ShopOwnerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="shop-owner-dashboard">
      <h1>Shop Owner Dashboard</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>View Deals</h2>
          <p>See the current deals for your shop.</p>
          <button onClick={() => navigate('/shopowner/view-deals')}>View Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Update Deals</h2>
          <p>Update the deals available for your shop.</p>
          <button onClick={() => navigate('/shopowner/update-deals')}>Manage Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Add Deals</h2>
          <p>Add new deals to your shop's offerings.</p>
          <button onClick={() => navigate('/shopowner/add-deals')}>Manage Now</button>
        </div>
        <div className="dashboard-card">
          <h2>View Shop Details</h2>
          <p>See detailed information about your shop.</p>
          <button onClick={() => navigate('/shopowner/view-shop-details')}>View Now</button>
        </div>
        <div className="dashboard-card">
          <h2>Update Shop Details</h2>
          <p>Update the information of your shop.</p>
          <button onClick={() => navigate('/shopowner/update-shop-details')}>Manage Now</button>
        </div>
      </div>
    </div>
  );
};

export default ShopOwnerDashboard;
