import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './shoppingFolder/components/Header';
import NavBar from './shoppingFolder/components/NavBar';
import Login from './shoppingFolder/components/Login/Login';
import Signup from './shoppingFolder/components/Signup/Signup';
import Body from './shoppingFolder/components/Body';
import ShopsList from './shoppingFolder/components/Sholist';
import Deals from './shoppingFolder/components/Deals';
import Event from './shoppingFolder/components/Event';
function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shoplist" element={<ShopsList />} />
          <Route path="/Deals" elements={<Deals/>} />
          <Route path="/Event" elements={<Event/>} />
        </Routes>
        <Body/>
      </div>
    </Router>
  );
}

export default App;
