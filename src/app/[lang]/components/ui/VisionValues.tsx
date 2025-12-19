'use client';

import React from 'react';
import { 
  LucideIcon, 
  Leaf, 
  Handshake, 
  Users, 
  BookOpen, 
  Heart 
} from 'lucide-react';

type ValueItem = {
  title: string;
  description: string;
  icon: string;
};

interface VisionValuesProps {
  visionValues: {
    title: string;
    description: string;
    values: ValueItem[];
  };
}

const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  handshake: Handshake,
  users: Users,
  "book-open": BookOpen,
  heart: Heart
};

const VisionValues: React.FC<VisionValuesProps> = ({ visionValues }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">{visionValues.title}</h2>
          <p className="text-gray-600 mt-4 text-lg">{visionValues.description}</p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visionValues.values?.map((value, idx) => {
            const Icon = iconMap[value.icon];

            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
              >
                {Icon && <Icon className="w-10 h-10 text-orange-500 mb-4" />}
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisionValues;
