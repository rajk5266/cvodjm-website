'use client';

import React, { useState, useEffect } from 'react';
import BookingFilter from './components/BookingFilter';
import MemberSelection from './components/MemberSelection';
import RoomDetailsForm from './components/forms/RoomDetailsForm';
import HallDetailsForm from './components/forms/HallDetailsForm';
import PaymentDetailsForm from './components/forms/PaymentDetailsForm';
import {
  BookingType,
  BookingLocation,
  Member,
  PersonalDetails,
  ResidentialDetails,
  RoomDetails,
  RoomFoodDetails,
  HallDetails,
  HallFoodDetails,
  PaymentDetails,
} from '@/types/bookings';

const BookingFormClient: React.FC = () => {
  const [step, setStep] = useState<'filter' | 'form'>('filter');
  const [bookingType, setBookingType] = useState<BookingType | null>(null);
  const [location, setLocation] = useState<BookingLocation | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [useMemberData, setUseMemberData] = useState(false);

  const [personalDetails, setPersonalDetails] = useState<Partial<PersonalDetails>>({});
  const [residentialDetails, setResidentialDetails] = useState<Partial<ResidentialDetails>>({});
  const [roomDetails, setRoomDetails] = useState<Partial<RoomDetails>>({});
  const [hallDetails, setHallDetails] = useState<Partial<HallDetails>>({});
  const [roomFoodDetails, setRoomFoodDetails] = useState<Partial<RoomFoodDetails>>({});
  const [hallFoodDetails, setHallFoodDetails] = useState<Partial<HallFoodDetails>>({});
  const [paymentDetails, setPaymentDetails] = useState<Partial<PaymentDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill when member selected
  useEffect(() => {
    if (selectedMember && useMemberData) {
      setPersonalDetails({
        firstName: selectedMember.firstName,
        middleName: selectedMember.middleName,
        surname: selectedMember.surname,
        mobileNo: selectedMember.mobileNo,
        emailId: selectedMember.emailId,
        villageName: selectedMember.villageName,
      });
    }
  }, [selectedMember, useMemberData]);

  const handleFilterApply = () => {
    if (bookingType && location) setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const applicationNo = `APP${Date.now()}`;
      const dateOfApplication = new Date().toISOString();

      const bookingData = {
        applicationNo,
        dateOfApplication,
        bookingType,
        location,
        personalDetails,
        residentialDetails,
        paymentDetails: {
          ...paymentDetails,
          advance: bookingType === 'room' ? 1050 : 5100,
        },
        primaryMemberId: selectedMember?.id,
        ...(bookingType === 'room'
          ? { roomDetails, foodDetails: roomFoodDetails }
          : { hallDetails, foodDetails: hallFoodDetails }),
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error('Failed to submit booking');

      alert(`✅ Booking submitted successfully!
Application No: ${applicationNo}
Your application will be reviewed by the admin.`);
      handleReset();
    } catch (error) {
      console.error(error);
      alert('❌ Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep('filter');
    setBookingType(null);
    setLocation(null);
    setSelectedMember(null);
    setUseMemberData(false);
    setPersonalDetails({});
    setResidentialDetails({});
    setRoomDetails({});
    setHallDetails({});
    setRoomFoodDetails({});
    setHallFoodDetails({});
    setPaymentDetails({});
  };

  return (
    <>
      {step === 'filter' ? (
        <BookingFilter
          bookingType={bookingType}
          location={location}
          onBookingTypeChange={setBookingType}
          onLocationChange={setLocation}
          onApply={handleFilterApply}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {bookingType === 'room' ? 'Room Booking' : 'Hall Booking'} Application
                </h2>
                <p className="text-gray-600">Location: {location}</p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold"
              >
                ← Change Selection
              </button>
            </div>
          </div>

          <MemberSelection
            onMemberSelect={setSelectedMember}
            onUseMemberData={setUseMemberData}
            selectedMember={selectedMember}
          />

          {bookingType === 'room' ? (
            <RoomDetailsForm
              roomData={roomDetails}
              foodData={roomFoodDetails}
              onRoomChange={setRoomDetails}
              onFoodChange={setRoomFoodDetails}
            />
          ) : (
            <HallDetailsForm
              hallData={hallDetails}
              foodData={hallFoodDetails}
              onHallChange={setHallDetails}
              onFoodChange={setHallFoodDetails}
            />
          )}

          <PaymentDetailsForm
            data={paymentDetails}
            onChange={setPaymentDetails}
            bookingType={bookingType!}
          />

          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="flex items-start">
              <input type="checkbox" required className="w-5 h-5 text-blue-600 mt-1" />
              <span className="ml-3 text-gray-700">
                I agree to the terms and conditions. I understand this is an
                application for booking and is subject to admin approval.
              </span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default BookingFormClient;
