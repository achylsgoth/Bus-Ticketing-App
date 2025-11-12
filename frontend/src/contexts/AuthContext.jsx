// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/auth/profile/');
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

const login = async (identifier, password) => {
  try {
    console.log('Attempting login with email:', identifier);
    
    // Always use email for login
    const loginData = { 
      email: identifier, 
      password: password 
    };
    
    console.log('Sending login data:', loginData);
    
    const response = await axios.post('/auth/login/', loginData);
    console.log('Login successful:', response.data);
    
    const { access, refresh } = response.data;
    
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    setToken(access);
    
    await fetchUserProfile();
    return { success: true };
    
  } catch (error) {
    console.error('Login error:', error.response?.data);
    
    let errorMessage = 'Login failed - Invalid email or password';
    if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail;
    } else if (error.response?.data) {
      errorMessage = JSON.stringify(error.response.data);
    }
    
    return { 
      success: false, 
      error: errorMessage 
    };
  }
};


const register = async (userData) => {
  try {
    console.log('Sending registration data:', userData);
    const response = await axios.post('/auth/register/', userData);
    console.log('Registration successful:', response.data);
    return { success: true };
  } catch (error) {
    console.error('Registration error details:', error.response?.data);
    return { 
      success: false, 
      error: error.response?.data || 'Registration failed' 
    };
  }
};
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};