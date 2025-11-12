// src/pages/BookingForm.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
  const { scheduleId } = useParams();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Book Your Trip</h1>
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-600 text-lg">Booking form for schedule {scheduleId} coming soon...</p>
      </div>
    </div>
  );
};

export default BookingForm;