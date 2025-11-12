// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SearchForm from '../components/SearchForm';
import axios from '../config/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingBookings();
  }, []);

  const fetchUpcomingBookings = async () => {
    try {
      const response = await axios.get('/bookings/');
      const bookings = response.data.filter(booking => 
        booking.booking_status === 'confirmed'
      ).slice(0, 3);
      setUpcomingBookings(bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.first_name || user?.username}!
        </h1>
        <p className="text-gray-600 mt-2">
          Book your next bus trip with CityConnect
        </p>
      </div>

      <SearchForm />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Trips</h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map(booking => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">
                      {booking.schedule_details.route_details.origin} → {booking.schedule_details.route_details.destination}
                    </h3>
                    <p className="text-gray-600">
                      {formatDate(booking.schedule_details.departure_time)} • {booking.number_of_seats} seat(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${booking.total_fare}</p>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {booking.booking_status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <Link
                to="/my-bookings"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                View all bookings →
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No upcoming trips found</p>
            <Link
              to="/search"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Book Your First Trip
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;