// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            CityConnect
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
                <Link to="/search" className="hover:text-blue-200 transition-colors">
                  Search Buses
                </Link>
                <Link to="/my-bookings" className="hover:text-blue-200 transition-colors">
                  My Bookings
                </Link>
                {user?.is_staff && (
                  <Link to="/admin" className="hover:text-blue-200 transition-colors">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span>Hello, {user?.first_name || user?.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;