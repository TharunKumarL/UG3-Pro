import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate,useLocation } from 'react-router-dom';
import './App.css';
import Header from './shoppingFolder/components/Header';
import Login from './shoppingFolder/components/Login/Login';
import Signup from './shoppingFolder/components/Signup/Signup';
import Body from './shoppingFolder/components/Body';
import ShopsList from './shoppingFolder/components/Sholist';
import Deals from './shoppingFolder/components/Deals';
import Event from './shoppingFolder/components/Event';
import Footer from './shoppingFolder/components/Footer';
import AdminDashboard from './shoppingFolder/components/AdminDashboard.jsx';
import AddShops from './shoppingFolder/components/Admin/AddShops.jsx';
import AddShopOwner from './shoppingFolder/components/Admin/AddShopOwner.jsx';
import UpdateShopOwner from './shoppingFolder/components/Admin/UpdateShopOwner.jsx';
import UpdateShopDetail from './shoppingFolder/components/Admin/UpdateShopDetail.jsx';
import UpdateShop from './shoppingFolder/components/Admin/UpdateShop.jsx';
import ViewShopOwners from './shoppingFolder/components/Admin/ViewShopOwners.jsx';
import SomeShops from './shoppingFolder/components/SomeShops.jsx';
// import ViewShops from './shoppingFolder/components/Admin/ViewShops.jsx';
import ShopOwnerLogin from './shoppingFolder/components/shopowner.jsx';
import ShopOwnerDashboard from './shoppingFolder/components/shopowner/dashboard.jsx';
import Viewdeals from './shoppingFolder/components/shopowner/viewdeals.jsx';
import AddDeals from './shoppingFolder/components/shopowner/AddDeals.jsx';
import ViewShopDetails from './shoppingFolder/components/shopowner/ViewShopDetails.jsx';
import UpdateDeals from './shoppingFolder/components/shopowner/UpdateDeals.jsx';
//Sports Section
import Sport_TopBar from './shoppingFolder/components/sports/Sport_TopBar.jsx';
import Create_Sport from './shoppingFolder/components/sports/Create_Sport.jsx';
import Show_Sport from './shoppingFolder/components/sports/Show_Sport.jsx';
import BookSlot from './shoppingFolder/components/sports/Booking_Sport.jsx';
//Restaurants
import Page from './shoppingFolder/components/restaurant/Page.jsx';
// Component to check if user is authenticated
const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return element;
};
const ProtectedRouteAdmin = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Assuming user data is stored in localStorage
  if (!token || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return element;
};
const ProtectedRouteshopowner = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Assuming user data is stored in localStorage
  if (!token || userRole !== 'shopowner') {
    return <Navigate to="/shopownerlogin" replace />;
  }
  return element;
};
const ProtectedRoutesports = ({ element }) => {
  const token = sessionStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.role; // Assuming user data is stored in localStorage
  if (!token || userRole !== 'sportsmanager') {
    return <Navigate to="/login" replace />;
  }
  return element;
};
function App() {
  return (
    <Router>
      <div>
        <Header />
        <SomeShops/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protect the home page ("/") and other pages that require authentication */}
          <Route path="/shoplist" element={<ProtectedRoute element={<ShopsList />} />} />
          <Route path="/deals" element={<ProtectedRoute element={<Deals />} />} />
          <Route path="/event" element={<ProtectedRoute element={<Event />} />} />
          <Route path="/" element={<ProtectedRoute element={<Body />} />} />
          <Route path="/booksports" element={<ProtectedRoute element={<Show_Sport/>}/>}/>
          <Route path="/bookrestaurant" element={<ProtectedRoute element={<Page/>}/>}/>
          <Route path="/admin/dashboard" element={<ProtectedRouteAdmin element={<AdminDashboard />} />} /> 
          <Route path="/admin/add-shop" element={<ProtectedRouteAdmin element={<AddShops />} />} />
          <Route path="/admin/update-shop" element={<ProtectedRouteAdmin element={<UpdateShop />} />} />
          <Route path="/admin/add-shopowners" element={<ProtectedRouteAdmin element={<AddShopOwner />} />} />
          <Route path="/admin/update-shopowners" element={<ProtectedRouteAdmin element={<UpdateShopOwner />} />} />
          <Route path="admin/update-shop/:id" element={<ProtectedRouteAdmin element={<UpdateShopDetail />} />} />
          <Route path="/admin/view-shops" element={<ProtectedRouteAdmin element={<ShopsList/>} />} />
          <Route path="/admin/view-shopowners" element={<ProtectedRouteAdmin element={<ViewShopOwners />} />} />
          <Route path="/shopownerlogin" element={<ShopOwnerLogin />}/>
          <Route path="/shopowner/dashboard" element={<ShopOwnerDashboard />}/>
          <Route path="/shopowner/view-deals" element={<Viewdeals />}/>
          <Route path="/shopowner/add-deals" element={<AddDeals />}/>
          <Route path="/shopowner/view-shop-details" element={<ViewShopDetails />}/>
          <Route path="/shopowner/update-deals" element={<UpdateDeals/>}/>
          <Route path='/sport/owner' element={<ProtectedRoutesports element={<><Sport_TopBar/><Show_Sport /></>}/>}/>
          <Route path='/sport/owner/create' element={<ProtectedRoutesports element={<Create_Sport />} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
