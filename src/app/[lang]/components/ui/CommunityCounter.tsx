'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Home, Gift, FileText } from 'lucide-react';
import Link from 'next/link';

interface CounterData {
  value: string; // string to include "+" etc.
  description: string;
}

interface CommunityCounterProps {
  content: {
    stats: CounterData[];
    cta: string;
  };
}

const icons: React.ElementType[] = [Users, Home, Gift, FileText];

const colors = ["text-blue-600", "text-green-600", "text-purple-600", "text-orange-600"];
const gradients = ["from-blue-500 to-blue-600", "from-green-500 to-green-600", "from-purple-500 to-purple-600", "from-orange-500 to-orange-600"];

const CommunityCounter: React.FC<CommunityCounterProps> = ({ content }) => {
  const [inView, setInView] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = content.stats;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Community in Numbers
          </h2>
        </div>

        {/* Stats Grid */}
        <div ref={counterRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((item, index) => (
            <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradients[index]} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {(() => {
                  const Icon = icons[index];
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>

              <div className="mb-4">
                <span className={`text-4xl md:text-5xl font-bold ${colors[index]} tabular-nums`}>
                  {inView ? item.value : "0"}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="#" className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Users className="w-6 h-6" />
            <span className="font-semibold text-lg">{content.cta}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityCounter;
