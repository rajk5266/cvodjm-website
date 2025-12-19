'use client';

import React from 'react';
import {
  HallDetails,
  HallFoodDetails,
  HALL_CATEGORY_OPTIONS,
  OCCASION_OPTIONS,
} from '@/types/bookings';

interface HallDetailsFormProps {
  hallData: Partial<HallDetails>;
  foodData: Partial<HallFoodDetails>;
  onHallChange: (data: Partial<HallDetails>) => void;
  onFoodChange: (data: Partial<HallFoodDetails>) => void;
}

/**
 * Generic helper to keep strong typing
 */
type ValueOf<T, K extends keyof T> = T[K];

const HallDetailsForm: React.FC<HallDetailsFormProps> = ({
  hallData,
  foodData,
  onHallChange,
  onFoodChange,
}) => {
  const handleHallChange = <K extends keyof HallDetails>(
    field: K,
    value: ValueOf<HallDetails, K>
  ) => {
    onHallChange({ ...hallData, [field]: value });
  };

  const handleFoodChange = <K extends keyof HallFoodDetails>(
    field: K,
    value: ValueOf<HallFoodDetails, K>
  ) => {
    onFoodChange({ ...foodData, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* ---------------- Hall Details ---------------- */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Hall Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hall Category */}
          <select
            value={hallData.hallCategory ?? ''}
            onChange={(e) =>
              handleHallChange('hallCategory', e.target.value as HallDetails['hallCategory'])
            }
            required
          >
            <option value="">Select Hall Category</option>
            {HALL_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Occasion */}
          <select
            value={hallData.occasion ?? ''}
            onChange={(e) =>
              handleHallChange('occasion', e.target.value as HallDetails['occasion'])
            }
            required
          >
            <option value="">Select Occasion</option>
            {OCCASION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* From Date */}
          <input
            type="datetime-local"
            value={hallData.fromDateTime ?? ''}
            onChange={(e) =>
              handleHallChange('fromDateTime', e.target.value)
            }
            required
          />

          {/* To Date */}
          <input
            type="datetime-local"
            value={hallData.toDateTime ?? ''}
            onChange={(e) =>
              handleHallChange('toDateTime', e.target.value)
            }
            required
          />

          {/* Guests */}
          <input
            type="number"
            min={1}
            value={hallData.noOfGuestsExpected ?? ''}
            onChange={(e) =>
              handleHallChange('noOfGuestsExpected', Number(e.target.value))
            }
            required
          />
        </div>
      </div>

      {/* ---------------- Food Details ---------------- */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Food Details</h3>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={foodData.foodServed === true}
              onChange={() => handleFoodChange('foodServed', true)}
            />
            Yes
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={foodData.foodServed === false}
              onChange={() => handleFoodChange('foodServed', false)}
            />
            No
          </label>
        </div>

        {foodData.foodServed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              placeholder="Name of Caterers"
              value={foodData.nameOfCaterers ?? ''}
              onChange={(e) =>
                handleFoodChange('nameOfCaterers', e.target.value)
              }
              required
            />

            <input
              type="text"
              placeholder="Contact Person Name"
              value={foodData.contactPersonName ?? ''}
              onChange={(e) =>
                handleFoodChange('contactPersonName', e.target.value)
              }
              required
            />

            <input
              type="tel"
              placeholder="Contact Person Phone"
              value={foodData.contactPersonPhone ?? ''}
              onChange={(e) =>
                handleFoodChange('contactPersonPhone', e.target.value)
              }
              required
            />

            <textarea
              className="md:col-span-2"
              placeholder="Address of Caterers"
              value={foodData.addressOfCaterers ?? ''}
              onChange={(e) =>
                handleFoodChange('addressOfCaterers', e.target.value)
              }
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HallDetailsForm;
