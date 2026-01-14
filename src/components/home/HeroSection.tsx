import React from 'react';
import { CONFIG } from '@/config/constants';

export const HeroSection: React.FC = () => {
  return (
    <>
      {/* Desktop Hero - Central Hexagon */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none select-none">
        <div
          className="relative w-[600px] h-[600px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-5xl font-black text-white text-center"
              style={{
                letterSpacing: '8px',
                fontFamily: "'Tomorrow', sans-serif"
              }}
            >
              {CONFIG.text.heroTitle}
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile Hero - Top Text */}
      <div className="md:hidden text-center mb-4 z-10 relative">
        <h1
          className="text-xl sm:text-2xl font-black text-white text-center"
          style={{
            letterSpacing: '3px',
            fontFamily: "'Tomorrow', sans-serif",
            lineHeight: '1.1'
          }}
        >
          {CONFIG.text.heroTitle}
        </h1>
      </div>
    </>
  );
};
