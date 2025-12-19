
import React from 'react';
import { LABELS } from '../constants/membership';
import { MinorityFormData } from '@/types/minority';
interface FormInputProps {
  name: keyof MinorityFormData;
  type?: string;
  required?: boolean;
  options?: string[];
  formData: MinorityFormData;
  setFormData: (data: MinorityFormData) => void;
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
  readOnly = false
}) => {
  const value = (formData[name] != null ? String(formData[name]) : '') as string;
  const labelKey = name as keyof typeof LABELS;
  const displayLabel = label || LABELS[labelKey];

  const renderLabel = () => {
    if (displayLabel) {
      return (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {displayLabel.en} / {displayLabel.gu}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      );
    }
    return null;
  };

  const handleChange = (newValue: string | File | null) => {
    if (name === 'dob' && newValue && typeof newValue === 'string') {
      const birthDate = new Date(newValue);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      setFormData({ 
        ...formData, 
        [name]: newValue,
        age: age
      });
      return;
    }
    setFormData({ ...formData, [name]: newValue });
  };

  if (type === 'select') {
    return (
      <div>
        {renderLabel()}
        <select
          name={name}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        >
          <option value="">Select / પસંદ કરો</option>
          {options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'radio' && options) {
    return (
      <div>
        {renderLabel()}
        <div className="flex space-x-4">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={(e) => handleChange(e.target.value)}
                className="mr-2"
                required={required}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'file') {
    return (
      <div>
        {renderLabel()}
        <input
          type="file"
          name={name}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            handleChange(file);
          }}
          accept="image/*,.pdf"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={required}
        />
      </div>
    );
  }

  return (
    <div>
      {renderLabel()}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          readOnly ? 'bg-gray-100' : ''
        }`}
        placeholder={placeholder}
        required={required}
        readOnly={readOnly}
      />
    </div>
  );
};
