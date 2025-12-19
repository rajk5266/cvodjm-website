// components/PageHeader.tsx
import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  backgroundImage?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backgroundImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop"
}) => {
  return (
    <div className="relative h-96 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-purple-900/80" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
        
        {/* Decorative elements */}
        <div className="flex justify-center mt-8 space-x-2">
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
          <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
        </div>
      </div>
      
    </div>
  );
};

export default PageHeader;