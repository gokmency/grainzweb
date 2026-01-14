import React from 'react';
import OutlineButton from '@/components/OutlineButton';
import { CONFIG } from '@/config/constants';

interface WhatWeDoProps {
  onFollowClick: () => void;
  onContactClick: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onFollowClick, onContactClick }) => {
  return (
    <div className="w-full md:max-w-sm bg-black/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-lg md:rounded-none p-3 md:p-0 border md:border-none border-white/20">
      <h2
        className="text-sm md:text-lg font-bold text-white mb-2 md:mb-4 text-center md:text-left"
        style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
      >
        {CONFIG.text.whatWeDo.title}
      </h2>

      {/* Desktop Description */}
      <p className="hidden md:block text-white mb-6 leading-relaxed text-sm md:text-base" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
        {CONFIG.text.whatWeDo.description}
      </p>

      {/* Mobile Description */}
      <p className="md:hidden text-white mb-3 leading-tight text-center text-xs" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
        {CONFIG.text.whatWeDo.mobileDescription}
      </p>

      <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start">
        {/* Constrained width containers for desktop to prevent full-width stretching */}
        <div className="w-full md:w-auto">
          <OutlineButton onClick={onFollowClick} aria-label="Follow Grainz on X" className="w-full md:w-auto md:min-w-[140px] flex items-center justify-center md:justify-between">
            <span>FOLLOW US</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-3 hidden md:block">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </OutlineButton>
        </div>

        <div className="w-full md:w-auto">
          <OutlineButton onClick={onContactClick} aria-label="Contact Grainz" className="w-full md:w-auto md:min-w-[140px] flex items-center justify-center md:justify-between">
            <span>CONTACT WITH US</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-3 hidden md:block">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </OutlineButton>
        </div>
      </div>
    </div>
  );
};
