import React from 'react';
import { StepProps } from '@/types/membership';
import { FormInput } from '../FormInput';
import { VILLAGES, BLOOD_GROUPS, EDUCATION_LEVELS, GOVT_ID_TYPES } from '../../constants/membership';

export const PersonalDetailsStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  // loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formDataObj = new FormData(form);
    const stepData: any = {};

    for (const [key, value] of formDataObj.entries()) {
      if (key.includes('govtId') && value instanceof File) {
        stepData[key] = value;
      } else {
        stepData[key] = value;
      }
    }

    // onNext(stepData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Personal Details / વ્યક્તિગત વિગતો
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="middleName"
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="grandfatherName"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="surname"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="village"
            type="select"
            required
            options={VILLAGES}
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="gender"
            type="radio"
            required
            options={['Male / પુરુષ', 'Female / સ્ત્રી']}
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="dob"
            type="date"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="age"
            type="number"
            readOnly
            formData={formData}
            setFormData={setFormData}
            label={{ en: 'Age (Auto-calculated)', gu: 'ઉંમર (આપોઆપ ગણતરી)' }}
          />
          <FormInput
            name="bloodGroup"
            type="select"
            options={BLOOD_GROUPS}
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="whatsappNo"
            type="tel"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="mobileNo"
            type="tel"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="email"
            type="email"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="maritalStatus"
            type="select"
            required
            options={['Single / અવિવાહિત', 'Married / વિવાહિત', 'Divorced / છૂટાછેડા', 'Widowed / વિધવા']}
            formData={formData}
            setFormData={setFormData}
          />
          {formData.maritalStatus === 'Married / વિવાહિત' && (
            <FormInput
              name="dom"
              type="date"
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>

        {formData.gender === 'Female / સ્ત્રી' && formData.maritalStatus === 'Married / વિવાહિત' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <FormInput
              name="fatherName"
              required
              formData={formData}
              setFormData={setFormData}
            />
            <FormInput
              name="maidenName"
              required
              formData={formData}
              setFormData={setFormData}
            />
            <FormInput
              name="maidenVillage"
              type="select"
              required
              options={VILLAGES}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
          <FormInput
            name="education"
            type="select"
            required
            options={EDUCATION_LEVELS}
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="govtId"
            type="select"
            required
            options={GOVT_ID_TYPES}
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="govtIdNo"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <div></div>
          {/* <FormInput
            name="govtIdFront"
            type="file"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="govtIdBack"
            type="file"
            required
            formData={formData}
            setFormData={setFormData}
          />
          <FormInput
            name="photo"
            type="file"
            required
            formData={formData}
            setFormData={setFormData}
          /> */}
        </div>

        {/* <div className="flex justify-end">
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