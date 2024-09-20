import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/css/AdminDashboard.css';
import AddShopOwner from './Admin/AddShopOwner';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  return (
    <div className="admin-body">
      {/* Admin management section */}
      <div className="admin-management">
        <h2 className="management-heading">Admin Management</h2>
        <div className="management-options">
          {/* Add Shops */}
          <div className="management-box add-shops">
            <h3>Add Shops</h3>
            <p>Manage and add new shops to the mall directory.</p>
            <button
              className="manage-now-btn"
              onClick={() => navigate('/admin/add-shop')}
            >
              Manage Now
            </button>
          </div>

          {/* Update Shops */}
          <div className="management-box update-shops">
            <h3>Update Shops</h3>
            <p>Update the details of existing shops in the mall directory.</p>
            <button
              className="manage-now-btn"
              onClick={() => navigate('/admin/update-shop')}
            >
              Manage Now
            </button>
          </div>

          {/* Add ShopOwners */}
          <div className="management-box add-shopowners">
            <h3>Add ShopOwners</h3>
            <p>Add new shop owners to the mall management system.</p>
            <button
              className="manage-now-btn"
              onClick={() => navigate('/admin/add-shopowners')}
            >
              Manage Now
            </button>
          </div>

          {/* Update ShopOwners */}
          <div className="management-box update-shopowners">
            <h3>Update ShopOwners</h3>
            <p>Update the details of existing shop owners.</p>
            <button
              className="manage-now-btn"
              onClick={() => navigate('/admin/update-shopowner')}
            >
              Manage Now
            </button>
          </div>

          {/* View Shops */}
          <div className="management-box view-shops">
            <h3>View Shops</h3>
            <p>View the list of all shops in the mall directory.</p>
            <button
              className="manage-now-btn"
              onClick={() => navigate('/admin/view-shops')}
            >
              View Now
            </button>
          </div>

          {/* View ShopOwners */}
          <div className="management-box view-shopowners">
            <h3>View ShopOwners</h3>
            <p>View the list of all shop owners in the mall management system.</p>
            <button
              className="manage-now-btn"
              onClick={() => navigate('/admin/view-shopowners')}
            >
              View Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
