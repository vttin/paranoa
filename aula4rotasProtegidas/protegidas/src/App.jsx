// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path='/register' element={<Register />} />
        <Route 
          path='/dash' 
          element={
            <ProtectRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

function ProtectRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return children;
}
