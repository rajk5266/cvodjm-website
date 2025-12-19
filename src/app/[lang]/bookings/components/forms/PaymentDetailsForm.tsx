'use client';

import React from 'react';
import {
  PaymentDetails,
  PAYMENT_MODE_OPTIONS,
  BookingType,
  ROOM_ADVANCE,
  HALL_ADVANCE,
} from '@/types/bookings';

interface PaymentDetailsFormProps {
  data: Partial<PaymentDetails>;
  onChange: (data: Partial<PaymentDetails>) => void;
  bookingType: BookingType;
}

/**
 * Helper type to preserve strict typing
 */
type ValueOf<T, K extends keyof T> = T[K];

const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
  data,
  onChange,
  bookingType,
}) => {
  const advanceAmount = bookingType === 'room' ? ROOM_ADVANCE : HALL_ADVANCE;

  const handleChange = <K extends keyof PaymentDetails>(
    field: K,
    value: ValueOf<PaymentDetails, K>
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileUpload = async (file: File) => {
    // TEMP mock upload – replace with real API later
    const url = URL.createObjectURL(file);
    handleChange('paymentProofUrl', url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
        Payment Details
      </h3>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          Advance payment required:{' '}
          <span className="font-bold">₹{advanceAmount}/-</span>
        </p>
        <p className="text-xs text-blue-600">
          {bookingType === 'room'
            ? '(₹1000 advance + ₹50 application fees)'
            : '(₹5000 advance + ₹100 application fees)'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Advance Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Advance Amount
          </label>
          <input
            type="number"
            value={advanceAmount}
            disabled
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-semibold"
          />
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Payment Mode <span className="text-red-500">*</span>
          </label>
          <select
            value={data.paymentMode ?? ''}
            onChange={(e) =>
              handleChange(
                'paymentMode',
                e.target.value as PaymentDetails['paymentMode']
              )
            }
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Payment Mode</option>
            {PAYMENT_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Date */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Payment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={data.paymentDate ?? ''}
            onChange={(e) =>
              handleChange('paymentDate', e.target.value)
            }
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Payment Proof */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Payment Proof <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) =>
              e.target.files?.[0] &&
              handleFileUpload(e.target.files[0])
            }
            required={!data.paymentProofUrl}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {data.paymentProofUrl && (
            <p className="text-sm text-green-600 mt-1">
              ✓ Payment proof uploaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsForm;
