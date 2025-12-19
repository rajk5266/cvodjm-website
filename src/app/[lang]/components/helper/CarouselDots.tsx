// components/ui/CarouselDots.tsx
import React from 'react';

interface CarouselDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({
  total,
  current,
  onDotClick,
}) => {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`
            w-3 h-3 rounded-full
            transition-all duration-300
            hover:scale-110
            ${
              index === current
                ? 'bg-blue-600 shadow-lg'
                : 'bg-gray-300 hover:bg-gray-400'
            }
          `}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselDots;