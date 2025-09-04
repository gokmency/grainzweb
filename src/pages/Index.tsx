import React from 'react';
import TeamPhotos from '../components/TeamPhotos';
import OutlineButton from '@/components/OutlineButton';
import { Waves } from '@/components/ui/waves-background';
import { WorksWith } from '../components/WorksWith';

// Tomorrow font import from Google Fonts
if (typeof window !== "undefined") {
  // Only once
  if (!document.getElementById("tomorrow-font-link")) {
    const link = document.createElement("link");
    link.id = "tomorrow-font-link";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Tomorrow:wght@400;700;800&display=swap";
    document.head.appendChild(link);
  }
}

const Index = () => {
  const handleFollowUsClick = () => {
    window.open('https://x.com/grainzeth', '_blank');
  };

  const handleDesignClick = () => {
    // Temporarily disabled - new design page coming soon
    console.log('Design page - coming soon!');
  };

  const handleDevelopmentClick = () => {
    // Temporarily disabled - new development page coming soon
    console.log('Development page - coming soon!');
  };

  const handleCommunityClick = () => {
    // Temporarily disabled - new community page coming soon
    console.log('Community page - coming soon!');
  };

  const handleJoinTeamClick = () => {
    window.open('https://form.typeform.com/to/wWliUJsu', '_blank');
  };

  const handleGrainzClick = () => {
    window.open('https://x.com/grainzeth', '_blank');
  };

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleContentHubClick = () => {
    window.location.href = '/content-hub';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C8102E] to-[#E53E3E] relative overflow-hidden flex flex-col" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
      {/* Waves Animation Background */}
      <div className="absolute inset-0 z-0">
        <Waves
          strokeColor="rgba(255, 255, 255, 0.3)"
          backgroundColor="transparent"
          pointerSize={0.3}
        />
      </div>

      {/* Header - Logo (responsive) */}
      <header className="absolute top-4 left-4 md:top-8 md:left-16 z-10">
        <div className="flex items-center">
          <img 
            src="/grainz-logo.png" 
            alt="GRAINZ LABS Logo" 
            className="h-12 w-auto md:h-20 drop-shadow-lg select-none object-contain"
            draggable={false}
          />
        </div>
      </header>

      {/* Top Center Navigation */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center border-2 border-white overflow-hidden">
          <button
            onClick={handleHomeClick}
            className="bg-white text-[#C8102E] px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/90 border-r border-white/30"
            style={{ fontFamily: "'Tomorrow', sans-serif" }}
          >
            Home
          </button>
          <button
            onClick={handleContentHubClick}
            className="bg-transparent text-white px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:bg-white/10"
            style={{ fontFamily: "'Tomorrow', sans-serif" }}
          >
            Content Hub
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {/* Central Hexagon */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none">
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
                WE BUILD THINGS
              </h1>
            </div>
          </div>
        </div>

        {/* Top-Left Section - WHAT WE DO */}
        <div className="absolute top-52 left-20 max-w-sm z-10">
          <h2 
            className="text-lg font-bold text-white mb-4"
            style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
          >
            WHAT WE DO
          </h2>
          <p className="text-white mb-6 leading-relaxed" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
            We design, develop, and build innovative solutions while nurturing and managing vibrant communities that drive meaningful engagement and growth.
          </p>
          <OutlineButton onClick={handleFollowUsClick}>
            <div className="flex items-center justify-between w-full text-sm font-medium" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              <span>FOLLOW US</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-2">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </div>
          </OutlineButton>
        </div>

        {/* Bottom-Left Section - WORK WITH US */}
        <div className="absolute bottom-20 left-20 max-w-sm z-10">
          <h2 
            className="text-lg font-bold text-white mb-4"
            style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
          >
            WORK WITH US
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <OutlineButton onClick={handleDesignClick}>Design</OutlineButton>
            <OutlineButton onClick={handleDevelopmentClick}>Development</OutlineButton>
            <OutlineButton onClick={handleCommunityClick}>Community</OutlineButton>
            <OutlineButton onClick={handleJoinTeamClick}>Join our team</OutlineButton>
          </div>
        </div>

        {/* Right Section - WHO WE ARE & WORKED WITH */}
        <div className="absolute top-44 right-20 max-w-sm z-10">
          <h2 
            className="text-lg font-bold text-white mb-4"
            style={{ letterSpacing: '2px', fontFamily: "'Tomorrow', sans-serif" }}
          >
            WHO WE ARE
          </h2>
          <TeamPhotos />
          
          {/* WORKED WITH - Below team photos */}
          <div className="mt-8">
            <WorksWith />
          </div>
        </div>

        {/* Copyright notice - Desktop */}
        <div className="absolute bottom-2 left-0 w-full z-50 pointer-events-auto">
          <p className="text-center text-xs text-white/70 tracking-wide px-4" style={{
            textShadow: "0 2px 8px rgba(44,0,0,0.18)",
            fontFamily: "'Tomorrow', sans-serif"
          }}>
            © 2026{' '}
            <button 
              onClick={handleGrainzClick}
              className="underline hover:text-white transition-colors cursor-pointer"
            >
              GRAINZ
            </button>
            {' '}All rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile Layout - Fit to Screen */}
      <div className="block md:hidden h-screen flex flex-col">
        <div className="flex-1 px-4 pt-32 pb-4 space-y-4 z-10 relative overflow-hidden">
          {/* Mobile Main Title */}
          <div className="text-center mb-4">
            <h1
              className="text-xl sm:text-2xl font-black text-white text-center"
              style={{
                letterSpacing: '3px',
                fontFamily: "'Tomorrow', sans-serif",
                lineHeight: '1.1'
              }}
            >
              WE BUILD THINGS
            </h1>
          </div>

          {/* WHAT WE DO Section */}
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h2 
              className="text-sm font-bold text-white mb-2 text-center"
              style={{ letterSpacing: '1px', fontFamily: "'Tomorrow', sans-serif" }}
            >
              WHAT WE DO
            </h2>
            <p className="text-white mb-3 leading-tight text-center text-xs" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              We design, develop, and build innovative solutions while nurturing communities.
            </p>
            <div className="flex justify-center">
              <OutlineButton onClick={handleFollowUsClick}>
                <span className="text-xs">FOLLOW US</span>
              </OutlineButton>
            </div>
          </div>

          {/* WORK WITH US Section - Moved Up */}
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h2 
              className="text-sm font-bold text-white mb-2 text-center"
              style={{ letterSpacing: '1px', fontFamily: "'Tomorrow', sans-serif" }}
            >
              WORK WITH US
            </h2>
            <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
              <OutlineButton onClick={handleDesignClick} className="w-full">
                <span className="block text-xs">Design</span>
              </OutlineButton>
              <OutlineButton onClick={handleDevelopmentClick} className="w-full">
                <span className="block text-xs">Development</span>
              </OutlineButton>
              <OutlineButton onClick={handleCommunityClick} className="w-full">
                <span className="block text-xs">Community</span>
              </OutlineButton>
              <OutlineButton onClick={handleJoinTeamClick} className="w-full">
                <span className="block text-xs">Join Team</span>
              </OutlineButton>
            </div>
          </div>

          {/* WHO WE ARE & WORKED WITH Section - Mobile */}
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <h2 
              className="text-sm font-bold text-white mb-2 text-center"
              style={{ letterSpacing: '1px', fontFamily: "'Tomorrow', sans-serif" }}
            >
              WHO WE ARE
            </h2>
            <div className="flex justify-center mb-4">
              <TeamPhotos />
            </div>
            
            {/* WORKED WITH - Below team photos */}
            <div className="mt-4">
              <WorksWith />
            </div>
          </div>
        </div>

        {/* Copyright notice - Mobile */}
        <div className="py-2 z-50 pointer-events-auto">
          <p className="text-center text-xs text-white/70 tracking-wide px-4" style={{
            textShadow: "0 2px 8px rgba(44,0,0,0.18)",
            fontFamily: "'Tomorrow', sans-serif"
          }}>
            © 2026{' '}
            <button 
              onClick={handleGrainzClick}
              className="underline hover:text-white transition-colors cursor-pointer"
            >
              GRAINZ
            </button>
            {' '}All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
