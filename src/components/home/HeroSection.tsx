import React from 'react';
import { CONFIG } from '@/config/constants';
import { useLanguage } from '@/hooks/useLanguage';

export const HeroSection: React.FC = () => {
  const lang = useLanguage();
  return (
    <>
      {/* Desktop Hero - Central Hexagon */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none select-none">
        <div
          className="relative w-[300px] lg:w-[450px] xl:w-[500px] h-[300px] lg:h-[450px] xl:h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8">
            <h1
              className="text-2xl lg:text-3xl xl:text-4xl font-black text-white text-center max-w-[90%]"
              style={{
                letterSpacing: lang === 'tr' ? '2px' : '6px',
                fontFamily: "'Tomorrow', sans-serif",
                lineHeight: '1.2'
              }}
            >
              {CONFIG.text.heroTitle[lang]}
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Hero - Top Text */}
      <div className="md:hidden text-center mb-4 z-10 relative">
        <h1
          className="text-xl sm:text-2xl font-black text-white text-center px-4"
          style={{
            letterSpacing: lang === 'tr' ? '1px' : '3px',
            fontFamily: "'Tomorrow', sans-serif",
            lineHeight: '1.2'
          }}
        >
          {CONFIG.text.heroTitle[lang]}
        </h1>
      </div>
    </>
  );
};
