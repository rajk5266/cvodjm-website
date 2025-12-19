import React from 'react';
import { StepProps } from '@/types/membership';
import { FormInput } from '../FormInput';
import { OCCUPATIONS, STATES, COUNTRIES } from '../../constants/membership';

export const WorkDetailsStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  onNext,
  // onPrevious,
  // loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    const stepData: any = {};
    
    for (const [key, value] of formDataObj.entries()) {
      stepData[key] = value;
    }
    
    onNext(stepData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Work Details / કાર્યની વિગતો
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="occupation"
            type="select"
            required
            options={OCCUPATIONS}
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Occupation', gu: 'વ્યવસાય' }}
          />
          <FormInput
            name="organizationName"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Name of Organisation', gu: 'સંસ્થાનું નામ' }}
          />
          <FormInput
            name="workHouseNo"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'House/Flat/Block/Plot No.', gu: 'ઘર/ફ્લેટ/બ્લોક/પ્લોટ નંબર' }}
          />
          <FormInput
            name="workBuildingName"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'House/Building Name', gu: 'ઘર/બિલ્ડિંગનું નામ' }}
          />
          <FormInput
            name="workStreet"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Street/Road Name/No.', gu: 'શેરી/રસ્તાનું નામ/નંબર' }}
          />
          <FormInput
            name="workLandmark1"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Landmark 1', gu: 'સીમાચિહ્ન 1' }}
          />
          <FormInput
            name="workLandmark2"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Landmark 2', gu: 'સીમાચિહ્ન 2' }}
          />
          <FormInput
            name="workArea"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Area/Town', gu: 'વિસ્તાર/નગર' }}
          />
          <FormInput
            name="workCity"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'City', gu: 'શહેર' }}
          />
          <FormInput
            name="workDistrict"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'District', gu: 'જિલ્લો' }}
          />
          <FormInput
            name="workState"
            type="select"
            options={STATES}
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'State', gu: 'રાજ્ય' }}
          />
          <FormInput
            name="workCountry"
            type="select"
            options={COUNTRIES}
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Country', gu: 'દેશ' }}
          />
          <FormInput
            name="workPincode"
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Pincode/Zip Code', gu: 'પિનકોડ' }}
          />
        </div>

        {/* <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Previous / પાછળ
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving... / સાચવી રહ્યું છે...' : 'Next / આગળ'}
          </button>
        </div> */}
      </div>
    </form>
  );
};