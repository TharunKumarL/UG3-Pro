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
import Admin from './shoppingFolder/components/Admin';
import AdminDashboard from './shoppingFolder/components/AdminDashboard.jsx';

// Component to check if user is authenticated
const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return element;
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protect the home page ("/") and other pages that require authentication */}
          <Route path="/shoplist" element={<ProtectedRoute element={<ShopsList />} />} />
          <Route path="/deals" element={<ProtectedRoute element={<Deals />} />} />
          <Route path="/event" element={<ProtectedRoute element={<Event />} />} />
          <Route path="/" element={<ProtectedRoute element={<Body />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
