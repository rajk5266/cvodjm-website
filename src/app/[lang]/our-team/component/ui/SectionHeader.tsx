// components/ui/SectionHeader.tsx
import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative">
        {title}
        {/* Accent line */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
          <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;