'use client'
import React from 'react';
import { RoomDetails, RoomFoodDetails, ROOM_CATEGORY_OPTIONS, ROOM_TYPE_OPTIONS } from '@/types/bookings';

interface RoomDetailsFormProps {
  roomData: Partial<RoomDetails>;
  foodData: Partial<RoomFoodDetails>;
  onRoomChange: (data: Partial<RoomDetails>) => void;
  onFoodChange: (data: Partial<RoomFoodDetails>) => void;
}

const RoomDetailsForm: React.FC<RoomDetailsFormProps> = ({
  roomData,
  foodData,
  onRoomChange,
  onFoodChange,
}) => {
  const handleRoomChange = (field: keyof RoomDetails, value: any) => {
    onRoomChange({ ...roomData, [field]: value });
  };

  const handleFoodChange = (field: keyof RoomFoodDetails, value: any) => {
    onFoodChange({ ...foodData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Room Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
          Room Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Room Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Category <span className="text-red-500">*</span>
            </label>
            <select
              value={roomData.roomCategory || ''}
              onChange={(e) => handleRoomChange('roomCategory', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              {ROOM_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type <span className="text-red-500">*</span>
            </label>
            <select
              value={roomData.roomType || ''}
              onChange={(e) => handleRoomChange('roomType', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Type</option>
              {ROOM_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* From DateTime */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={roomData.fromDateTime || ''}
              onChange={(e) => handleRoomChange('fromDateTime', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* To DateTime */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-out Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={roomData.toDateTime || ''}
              onChange={(e) => handleRoomChange('toDateTime', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* No of Adults */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. of Adults <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={roomData.noOfAdults || 0}
              onChange={(e) => handleRoomChange('noOfAdults', parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* No of Children */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. of Children
            </label>
            <input
              type="number"
              min="0"
              value={roomData.noOfChildren || 0}
              onChange={(e) => handleRoomChange('noOfChildren', parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* No of Vehicles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              No. of Vehicles
            </label>
            <input
              type="number"
              min="0"
              value={roomData.noOfVehicles || 0}
              onChange={(e) => handleRoomChange('noOfVehicles', parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Food Details */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Food Details <span className="text-sm text-gray-500">(On check-in time only)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lunch/Dinner Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lunch/Dinner Required?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={foodData.lunchDinnerRequired === true}
                  onChange={() => handleFoodChange('lunchDinnerRequired', true)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={foodData.lunchDinnerRequired === false}
                  onChange={() => handleFoodChange('lunchDinnerRequired', false)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* No of Plates */}
          {foodData.lunchDinnerRequired && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                No. of Plates <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={foodData.noOfPlates || 0}
                onChange={(e) => handleFoodChange('noOfPlates', parseInt(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required={foodData.lunchDinnerRequired}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsForm;