import React, { useState } from 'react';
import TeamPhotos from '../components/TeamPhotos';
import { Waves } from '@/components/ui/waves-background';
import { WorksWith } from '../components/WorksWith';
import { WhatWeDo } from '../components/home/WhatWeDo';
import { WorkWithUs } from '../components/home/WorkWithUs';
import { HeroSection } from '../components/home/HeroSection';
import { ContactPopup } from '../components/home/ContactPopup';
import { CONFIG } from '@/config/constants';

const Index = () => {
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleFollowUsClick = () => {
    window.open(CONFIG.socials.twitter, '_blank');
  };

  const handleContactUsClick = () => {
    setShowContactPopup(true);
  };

  const handleGrainzClick = () => {
    window.open(CONFIG.socials.twitter, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8102E] to-[#E53E3E] relative flex flex-col overflow-hidden" style={{ fontFamily: "'Tomorrow', sans-serif" }} role="main">
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(255, 255, 255, 0.3)"
          backgroundColor="transparent"
          pointerSize={0.3}
        />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full max-w-[1440px] mx-auto p-4 md:p-12 flex flex-col justify-between">

        {/* Mobile Header Spacer for Fixed Nav/Logo if present (currently just spacing) */}
        <div className="h-16 md:hidden"></div>

        {/* Hero Section */}
        <HeroSection />

        {/* Top Section: What We Do (Desktop: Top-Left, Mobile: 2nd item) */}
        {/* Bottom Section: Work With Us (Desktop: Bottom-Left, Mobile: 1st item) */}
        {/* Right Section: Who We Are & Works With (Desktop: Right, Mobile: 3rd item) */}

        {/* Grid Layout Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full h-full relative z-20">
          
          {/* Left Column Area */}
          <div className="col-span-1 md:col-span-4 flex flex-col justify-between h-full space-y-4 md:space-y-0 order-2 md:order-1 pt-0 md:pt-32 pb-0 md:pb-20">

            {/* Top Left - What We Do */}
            <div className="md:mb-auto">
              <WhatWeDo
                onFollowClick={handleFollowUsClick}
                onContactClick={handleContactUsClick}
              />
            </div>

            {/* Bottom Left - Work With Us */}
            <div className="md:mt-auto pt-4 md:pt-0">
               <WorkWithUs />
            </div>
          </div>

          {/* Center Area (Space for Hexagon) */}
          <div className="hidden md:block col-span-4 order-2 pointer-events-none">
            {/* Empty space for the absolute positioned Hexagon in HeroSection */}
          </div>

          {/* Right Column Area */}
          <div className="col-span-1 md:col-span-4 flex flex-col h-full space-y-6 md:space-y-0 order-3 md:pt-24">
             {/* Top Right - Who We Are */}
             <div className="md:mb-auto bg-black/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-lg md:rounded-none p-3 md:p-0 border md:border-none border-white/20">
                <h2
                  className="text-sm md:text-lg font-bold text-white mb-2 md:mb-4 text-center md:text-left"
                  style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
                >
                  {CONFIG.text.whoWeAre.title}
                </h2>
                <div className="flex justify-center md:block">
                  <TeamPhotos />
                </div>

                {/* Worked With - Below team photos */}
                <div className="mt-4 md:mt-8">
                  <WorksWith />
                </div>
             </div>
          </div>

        </div>

        {/* Footer / Copyright */}
        <div className="mt-8 md:mt-0 md:absolute md:bottom-2 md:left-0 w-full z-50 pointer-events-auto" role="contentinfo">
          <p className="text-center text-xs text-white/70 tracking-wide px-4" style={{
            textShadow: "0 2px 8px rgba(44,0,0,0.18)",
            fontFamily: "'Tomorrow', sans-serif"
          }}>
            © 2026{' '}
            <button 
              onClick={handleGrainzClick}
              className="underline hover:text-white transition-colors cursor-pointer"
              aria-label="Visit Grainz X (Twitter) profile"
            >
              GRAINZ
            </button>
            {' '}All rights reserved.
          </p>
        </div>
      </div>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={showContactPopup}
        onClose={() => setShowContactPopup(false)}
      />
    </div>
  );
};

export default Index;
