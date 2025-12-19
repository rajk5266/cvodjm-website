'use client'
import React from 'react';
import { BookingType, BookingLocation, ROOM_LOCATIONS, HALL_LOCATIONS } from '@/types/bookings';

interface BookingFilterProps {
  bookingType: BookingType | null;
  location: BookingLocation | null;
  onBookingTypeChange: (type: BookingType | null) => void;
  onLocationChange: (location: BookingLocation | null) => void;
  onApply: () => void;
}

const BookingFilter: React.FC<BookingFilterProps> = ({
  bookingType,
  location,
  onBookingTypeChange,
  onLocationChange,
  onApply,
}) => {
  const getLocationOptions = () => {
    if (bookingType === 'room') {
      return ROOM_LOCATIONS;
    } else if (bookingType === 'hall') {
      return HALL_LOCATIONS;
    }
    return [];
  };

  const handleBookingTypeChange = (type: BookingType | null) => {
    onBookingTypeChange(type);
    onLocationChange(null); // Reset location when booking type changes
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">New Booking Application</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Type <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <input
                type="radio"
                name="bookingType"
                value="room"
                checked={bookingType === 'room'}
                onChange={() => handleBookingTypeChange('room')}
                className="w-4 h-4 text-blue-600"
              />
              <div className="ml-3">
                <div className="font-semibold text-gray-800">Stay / Room</div>
                <div className="text-sm text-gray-600">Book accommodation for your stay</div>
              </div>
            </label>

            <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
              <input
                type="radio"
                name="bookingType"
                value="hall"
                checked={bookingType === 'hall'}
                onChange={() => handleBookingTypeChange('hall')}
                className="w-4 h-4 text-blue-600"
              />
              <div className="ml-3">
                <div className="font-semibold text-gray-800">Hall</div>
                <div className="text-sm text-gray-600">Book a hall for events</div>
              </div>
            </label>
          </div>
        </div>

        {/* Location Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {bookingType ? (
              getLocationOptions().map((loc) => (
                <label
                  key={loc.value}
                  className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="location"
                    value={loc.value}
                    checked={location === loc.value}
                    onChange={() => onLocationChange(loc.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <div className="font-semibold text-gray-800">{loc.label}</div>
                  </div>
                </label>
              ))
            ) : (
              <div className="p-4 border-2 border-dashed rounded-lg text-center text-gray-500">
                Please select a booking type first
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onApply}
          disabled={!bookingType || !location}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Proceed to Application
        </button>
      </div>
    </div>
  );
};

export default BookingFilter;