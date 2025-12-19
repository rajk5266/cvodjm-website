import React from 'react';
import { StepProps } from '@/types/membership';
import { VILLAGES } from '../../constants/membership';

export const ReferenceDetailsStep: React.FC<StepProps> = ({
  formData,
  setFormData,
  onNext,
  // onPrevious,
  // loading
}) => {
  const references = formData.references || [{ firstName: '', middleName: '', surname: '', mobileNo: '', village: '' }];
  
  const addReference = () => {
    if (references.length < 5) {
      const newReferences = [...references, { firstName: '', middleName: '', surname: '', mobileNo: '', village: '' }];
      setFormData({ ...formData, references: newReferences });
    }
  };

  const removeReference = (index: number) => {
    if (references.length > 1) {
      const newReferences = references.filter((_, i) => i !== index);
      setFormData({ ...formData, references: newReferences });
    }
  };

  const updateReference = (index: number, field: string, value: string) => {
    const newReferences = [...references];
    newReferences[index] = { ...newReferences[index], [field]: value };
    setFormData({ ...formData, references: newReferences });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ references });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Reference Details / સંદર્ભની વિગતો
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Minimum 1 reference required, maximum 5 allowed / ઓછામાં ઓછા 1 સંદર્ભ જરૂરી, વધુમાં વધુ 5 મંજૂર
        </p>
        
        {references.map((reference, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-700">
                Reference {index + 1} / સંદર્ભ {index + 1}
              </h4>
              {references.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeReference(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove / દૂર કરો
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name / પ્રથમ નામ *
                </label>
                <input
                  type="text"
                  value={reference.firstName}
                  onChange={(e) => updateReference(index, 'firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name / મધ્ય નામ
                </label>
                <input
                  type="text"
                  value={reference.middleName || ''}
                  onChange={(e) => updateReference(index, 'middleName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surname / અટક *
                </label>
                <input
                  type="text"
                  value={reference.surname}
                  onChange={(e) => updateReference(index, 'surname', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number / મોબાઇલ નંબર *
                </label>
                <input
                  type="tel"
                  value={reference.mobileNo}
                  onChange={(e) => updateReference(index, 'mobileNo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village / ગામ *
                </label>
                <select
                  value={reference.village}
                  onChange={(e) => updateReference(index, 'village', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Village / ગામ પસંદ કરો</option>
                  {VILLAGES.map((village) => (
                    <option key={village} value={village}>{village}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}

        {references.length < 5 && (
          <button
            type="button"
            onClick={addReference}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-blue-500 hover:text-blue-500"
          >
            + Add Another Reference / + બીજો સંદર્ભ ઉમેરો
          </button>
        )}
{/* 
        <div className="flex justify-between">
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
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Submitting... / સબમિટ કરી રહ્યું છે...' : 'Submit Application / અરજી સબમિટ કરો'}
          </button>
        </div> */}
      </div>
    </form>
  );
};
