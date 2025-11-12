// src/components/SearchForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(formData);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Bus Trips</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Origin city"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            placeholder="Destination city"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Search Buses
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;