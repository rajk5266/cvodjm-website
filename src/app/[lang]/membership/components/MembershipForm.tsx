'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MembershipFormData } from '@/types/membership';
import { ProgressBar } from './ProgressBar';
import { PersonalDetailsStep } from './steps/PersonalDetailsStep';
import { ResidentialDetailsStep } from './steps/ResidentialDetailsStep';
import { WorkDetailsStep } from './steps/WorkDetailsStep';
import { ReferenceDetailsStep } from './steps/ReferenceDetailsStep';
import { FileUploadStep } from './steps/FileUploads';
import { api } from '@/lib/api';

interface Member {
  id: string;
  govtIdNo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  formData?: any;
}

interface MembershipFormProps {
  editingMember?: Member | null;
  lang?: 'en' | 'gu';
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const MembershipForm: React.FC<MembershipFormProps> = ({
  editingMember,
  lang = 'en',
  onSuccess,
  onCancel
}) => {
  const router = useRouter();
  // const [initialFormData, setInitialFormData] = useState<MembershipFormData>({});
  const [formData, setFormData] = useState<MembershipFormData>({});
  const [draftId, setDraftId] = useState<string | undefined>(editingMember?.id);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const isEditing = !!editingMember;

  // Translations
  const translations = {
    en: {
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      update: 'Update',
      submitting: 'Submitting...',
      cancel: 'Cancel',
      editHeader: 'Edit Member Details',
      newHeader: 'Membership Application',
      saving: 'Saving...',
    },
    gu: {
      next: 'આગળ',
      previous: 'પાછળ',
      submit: 'સબમિટ',
      update: 'અપડેટ',
      submitting: 'સબમિટ થઈ રહ્યું છે...',
      cancel: 'રદ કરો',
      editHeader: 'સદસ્ય વિગતો સંપાદિત કરો',
      newHeader: 'સદસ્ય અરજી',
      saving: 'સાચવી રહ્યું છે...',
    },
  };

  const t = translations[lang];

  // const isFormChanged = () => {
  //   // return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  // };


  useEffect(() => {
    if (isEditing && editingMember?.formData) {
      setCurrentStep((editingMember as any).currentStep || 1);
      setFormData(editingMember.formData);
    }
  }, [editingMember, isEditing]);

  const handleNext = (stepData: Partial<MembershipFormData>) => {
    setFormData({ ...formData, ...stepData });
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const validateStep5Files = (data: MembershipFormData) => {
const requiredFiles: (keyof MembershipFormData)[] = ["govtIdFront", "govtIdBack", "photo"];

const missingFiles = requiredFiles.filter(field => !data[field]);

  
  return {
    isValid: missingFiles.length === 0,
    missingFiles,
    uploadedUrls: {
      govtIdFront: data.govtIdFront || "",
      govtIdBack: data.govtIdBack || "",
      photo: data.photo || "",
    }
  };
};

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Validate files if on step 5
    if (currentStep === 5) {
      const fileValidation = validateStep5Files(formData);
      
      if (!fileValidation.isValid) {
        setError(`Missing files: ${fileValidation.missingFiles.join(', ')}`);
        setLoading(false);
        return;
      }
      
      console.log("📁 Submitting with file URLs:", fileValidation.uploadedUrls);
    }

      const payload = {
      draftId,           // undefined if new, existing if editing
      formData: {
        ...formData,
        // Ensure file URLs are included
        uploadedFiles: {
          govtIdFront: formData.govtIdFront || "",
          govtIdBack: formData.govtIdBack || "",
          photo: formData.photo || "",
        }
      },
      currentStep,
    };
      // single API call for both new and update
      const response = await api.post('/membership/savedraft', payload);

      if (!response || !response.data) throw new Error('Failed to submit form');

      // update draftId in state if this was a new draft
      if (!draftId && response.data.draft?.id) {
        setDraftId(response.data.draft.id);
      }

      if (onSuccess) onSuccess();
      else router.push('/membership/success');
    } catch (err) {
      console.error(err);
      setError(lang === 'gu' ? 'ફોર્મ સબમિટ કરવામાં નિષ્ફળ.' : 'Failed to submit form.');
    } finally {
      setLoading(false);
    }
  };


  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      setFormData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      loading,
    };

    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep {...stepProps} />;
      case 2:
        return <ResidentialDetailsStep {...stepProps} />;
      case 3:
        return <WorkDetailsStep {...stepProps} />;
      case 4:
        return <ReferenceDetailsStep {...stepProps} />;
      case 5:
        return <FileUploadStep {...stepProps} />;
      default:
        return <PersonalDetailsStep {...stepProps} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? t.editHeader : t.newHeader}
          </h2>
          {isEditing && (
            <p className="text-sm text-gray-600 mt-1">
              {editingMember?.firstName} {editingMember?.lastName}
            </p>
          )}
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {t.cancel}
          </button>
        )}
      </div>

      {/* Progress */}
      <ProgressBar currentStep={currentStep} totalSteps={5} onStepClick={setCurrentStep} />

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Form Step */}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            {t.previous}
          </button>
        )}

        {currentStep < 5 ? (
          <button
            onClick={() => handleNext({})}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {t.next}
          </button>
        ) : (
          // <button
          //   onClick={handleSubmit}
          //   disabled={loading}
          //   className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          // >
          //   {loading ? t.saving : isEditing ? t.update : t.submit}
          // </button>
          <button
            onClick={handleSubmit}
            // disabled={loading || !isFormChanged()} // disabled if nothing changed
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.saving : draftId ? t.update : t.submit}
          </button>

        )}
      </div>
    </div>
  );
};
