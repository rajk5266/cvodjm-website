import React from 'react';
import { LABELS } from '../constants/membership';
import { MembershipFormData } from '@/types/membership';

interface FormInputProps {
  name: keyof MembershipFormData;
  type?: string;
  required?: boolean;
  options?: string[];
  formData: MembershipFormData;
  setFormData: (data: MembershipFormData) => void;
  label?: { en: string; gu: string };
  placeholder?: string;
  readOnly?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  type = 'text',
  required = false,
  options,
  formData,
  setFormData,
  label,
  placeholder,
  readOnly = false,
}) => {
  const value = (formData[name] != null ? String(formData[name]) : '') as string;

  const labelKey = name as keyof typeof LABELS;
  const displayLabel = label || LABELS[labelKey];

  const renderLabel = () =>
    displayLabel ? (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {displayLabel.en} / {displayLabel.gu}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
    ) : null;

  const handleChange = (newValue: string | File | null) => {
    if (name === 'dob' && typeof newValue === 'string') {
      const birthDate = new Date(newValue);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      setFormData({
        ...formData,
        dob: newValue,
        age,
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  /* SELECT */
  if (type === 'select') {
    return (
      <div>
        {renderLabel()}
        <select
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required={required}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select / પસંદ કરો</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  /* RADIO */
  if (type === 'radio' && options) {
    return (
      <div>
        {renderLabel()}
        <div className="flex space-x-4">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                value={option}
                checked={value === option}
                onChange={() => handleChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  }

  /* FILE */
  if (type === 'file') {
    return (
      <div>
        {renderLabel()}
        <input
          type="file"
          onChange={(e) => handleChange(e.target.files?.[0] ?? null)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
    );
  }

  /* DEFAULT INPUT */
  return (
    <div>
      {renderLabel()}
      <input
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        className={`w-full px-3 py-2 border rounded-md ${
          readOnly ? 'bg-gray-100' : ''
        }`}
      />
    </div>
  );
};
