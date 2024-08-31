import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './shoppingFolder/components/Header';
import NavBar from './shoppingFolder/components/NavBar';
import Login from './shoppingFolder/components/Login/Login';
import Signup from './shoppingFolder/components/Signup/Signup';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
