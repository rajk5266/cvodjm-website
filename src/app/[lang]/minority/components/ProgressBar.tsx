import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, onStepClick }) => {
  const steps = [
    { name: "Personal", nameGu: "વ્યક્તિગત" },
    { name: "Residential", nameGu: "રહેઠાણ" },
    { name: "Work", nameGu: "કાર્ય" },
    { name: "References", nameGu: "સંદર્ભ" },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Membership Application / સભ્યપદ અરજી
        </h2>
        <div className="text-sm text-gray-600">
          Step {currentStep} of {totalSteps} / પગલું {currentStep} of {totalSteps}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex justify-between mt-2 text-xs text-gray-500">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onStepClick?.(stepNumber)}
              className={`focus:outline-none ${
                isActive ? "text-blue-600 font-semibold" : isCompleted ? "text-blue-500" : "text-gray-400"
              }`}
            >
              {step.name} / {step.nameGu}
            </button>
          );
        })}
      </div>
    </div>
  );
};
