// components/ui/CarouselNavigation.tsx
import React from 'react';

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) => {
  return (
    <div className="flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full px-4 pointer-events-none">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`
          pointer-events-auto
          w-12 h-12 rounded-full
          flex items-center justify-center
          transition-all duration-200
          shadow-lg
          ${
            canGoPrevious
              ? 'bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`
          pointer-events-auto
          w-12 h-12 rounded-full
          flex items-center justify-center
          transition-all duration-200
          shadow-lg
          ${
            canGoNext
              ? 'bg-white hover:bg-gray-50 text-gray-700 hover:text-blue-600 hover:shadow-xl'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default CarouselNavigation;