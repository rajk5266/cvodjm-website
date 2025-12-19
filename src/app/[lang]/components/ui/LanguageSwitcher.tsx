// components/ui/LanguageSwitcher.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons' | 'minimal';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  variant = 'dropdown'
}) => {
  const { language, setLanguage, languageConfig, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const languageEntries = Object.entries(supportedLanguages);

  // ✅ Change language and keep the rest of the path intact
  const changeLanguage = (newLang: Language) => {
    setLanguage(newLang);

    // Split path into segments
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = newLang; // Replace the [lang] segment
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  // === Dropdown variant ===
  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white  hover transition-all duration-300 border border-gray-200 hover:border-orange-300 min-w-[120px]"
        >
          <span className="text-lg">{languageConfig.flag}</span>
          <span className="text-sm font-medium text-gray-700 flex-1 text-left">
            {languageConfig.nativeName}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 min-w-[180px] bg-white rounded-lg shadow-xl border border-gray-200 z-20 py-2">
              {languageEntries.map(([code, config]) => (
                <button
                  key={code}
                  onClick={() => {
                    changeLanguage(code as Language); // ✅ use changeLanguage here
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center justify-between group ${
                    language === code
                      ? 'bg-orange-50 text-orange-600 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{config.flag}</span>
                    <div>
                      <div className="font-medium">{config.nativeName}</div>
                      <div className="text-xs text-gray-400 group-hover:text-orange-400">
                        {config.name}
                      </div>
                    </div>
                  </div>
                  {language === code && <Check className="w-4 h-4 text-orange-600" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // === Buttons variant ===
  if (variant === 'buttons') {
    return (
      <div className={`flex items-center space-x-2 bg-gray-100 rounded-lg p-1 ${className}`}>
        {languageEntries.map(([code, config]) => (
          <button
            key={code}
            onClick={() => changeLanguage(code as Language)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              language === code
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <span className="text-base">{config.flag}</span>
            <span>{config.nativeName}</span>
          </button>
        ))}
      </div>
    );
  }

  // === Minimal variant ===
  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        {languageEntries.map(([code, config]) => (
          <button
            key={code}
            onClick={() => changeLanguage(code as Language)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-lg ${
              language === code
                ? 'border-orange-500 bg-orange-50 scale-110'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            title={config.name}
          >
            {config.flag}
          </button>
        ))}
      </div>
    );
  }

  return null;
};

export default LanguageSwitcher;



