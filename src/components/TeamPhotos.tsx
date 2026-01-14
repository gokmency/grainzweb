import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { TEAM_MEMBERS } from "../config/constants";

const TeamPhotos: React.FC = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (memberId: number, event: React.MouseEvent | React.TouchEvent) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate safe position within viewport
    const popupWidth = 320; // 80 * 4 (w-80)
    const popupHeight = 300; // estimated popup height
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = rect.left + scrollLeft + rect.width / 2;
    let y = rect.bottom + scrollTop + 10;
    
    // Adjust x position if popup would go off screen
    if (x + popupWidth / 2 > viewportWidth - 20) {
      x = viewportWidth - popupWidth / 2 - 20;
    }
    if (x - popupWidth / 2 < 20) {
      x = popupWidth / 2 + 20;
    }
    
    // Adjust y position if popup would go off screen
    if (y + popupHeight > scrollTop + viewportHeight - 20) {
      y = rect.top + scrollTop - popupHeight - 10;
    }
    
    setPopupPosition({ x, y });
    setHoveredMember(memberId);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredMember(null);
    }, 150);
  };

  const handlePopupMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
  };

  const handlePopupMouseLeave = () => {
    setHoveredMember(null);
  };


  const handleTwitterClick = (memberId: number) => {
    const member = TEAM_MEMBERS.find(m => m.id === memberId);
    if (member?.twitter) {
      window.open(member.twitter, '_blank');
    }
    setHoveredMember(null);
  };

  const handleLinkedInClick = (memberId: number) => {
    const member = TEAM_MEMBERS.find(m => m.id === memberId);
    if (member?.linkedin) {
      window.open(member.linkedin, '_blank');
    }
    setHoveredMember(null);
  };

  // Split team members: first 4 in left column, remaining 3 in right column
  const leftColumnMembers = TEAM_MEMBERS.slice(0, 4);
  const rightColumnMembers = TEAM_MEMBERS.slice(4, 7);

  return (
    <div className="relative">
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 gap-2 max-w-[180px]">
        {/* Left Column - 4 members */}
        <div className="space-y-2">
          {leftColumnMembers.map((member) => {
            const isHovered = member.id === hoveredMember;
            
            return (
              <div
                key={member.id}
                onMouseEnter={(e) => handleMouseEnter(member.id, e)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleMouseEnter(member.id, e)}
                onTouchStart={(e) => handleMouseEnter(member.id, e)}
                className={`group rounded-lg overflow-hidden relative border-2 transition-all duration-200 flex-shrink-0 bg-white w-full aspect-square cursor-pointer
                  ${isHovered ? "border-[#C8102E] shadow-lg scale-105 z-10" : "border-transparent hover:border-[#9D174D]"} 
                `}
                aria-label={member.name}
              >
                <img
                  src={member.photo}
                  alt={`${member.name} - ${member.role} at Grainz`}
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    isHovered ? "grayscale-0" : "grayscale hover:grayscale-0"
                  }`}
                  draggable={false}
                />
                {isHovered && (
                  <span
                    className="absolute inset-0 border-[3px] border-[#FBBF24] pointer-events-none rounded-lg"
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column - 3 members */}
        <div className="space-y-2">
          {rightColumnMembers.map((member) => {
            const isHovered = member.id === hoveredMember;
            
            return (
              <div
                key={member.id}
                onMouseEnter={(e) => handleMouseEnter(member.id, e)}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => handleMouseEnter(member.id, e)}
                onTouchStart={(e) => handleMouseEnter(member.id, e)}
                className={`group rounded-lg overflow-hidden relative border-2 transition-all duration-200 flex-shrink-0 bg-white w-full aspect-square cursor-pointer
                  ${isHovered ? "border-[#C8102E] shadow-lg scale-105 z-10" : "border-transparent hover:border-[#9D174D]"} 
                `}
                aria-label={member.name}
              >
                <img
                  src={member.photo}
                  alt={`${member.name} - ${member.role} at Grainz`}
                  className={`w-full h-full object-cover transition-all duration-200 ${
                    isHovered ? "grayscale-0" : "grayscale hover:grayscale-0"
                  }`}
                  draggable={false}
                />
                {isHovered && (
                  <span
                    className="absolute inset-0 border-[3px] border-[#FBBF24] pointer-events-none rounded-lg"
                    aria-hidden
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Grid Layout */}
      <div className="grid md:hidden grid-cols-4 gap-1 max-w-[200px] mx-auto">
        {TEAM_MEMBERS.map((member) => {
          const isHovered = member.id === hoveredMember;
          
          return (
            <div
              key={member.id}
              onMouseEnter={(e) => handleMouseEnter(member.id, e)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleMouseEnter(member.id, e)}
              onTouchStart={(e) => handleMouseEnter(member.id, e)}
              className={`group rounded-lg overflow-hidden relative border-2 transition-all duration-200 flex-shrink-0 bg-white w-full aspect-square cursor-pointer
                ${isHovered ? "border-[#C8102E] shadow-lg scale-105 z-10" : "border-transparent hover:border-[#9D174D]"} 
              `}
              aria-label={member.name}
            >
              <img
                src={member.photo}
                alt={`${member.name} - ${member.role} at Grainz`}
                className={`w-full h-full object-cover transition-all duration-200 ${
                  isHovered ? "grayscale-0" : "grayscale hover:grayscale-0"
                }`}
                style={{
                  objectPosition: 'center 25%'
                }}
                draggable={false}
              />
              {isHovered && (
                <span
                  className="absolute inset-0 border-[3px] border-[#FBBF24] pointer-events-none rounded-lg"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Team Member Popup - Portal to body */}
      {hoveredMember && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed z-[9999] transform -translate-x-1/2 pointer-events-auto"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
          }}
        >
          <div
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
            className="relative bg-white rounded-xl shadow-2xl w-80 max-w-[90vw] p-4 transform transition-all duration-300 ease-out scale-100 opacity-100 border border-gray-200"
            style={{
              fontFamily: "'Tomorrow', sans-serif"
            }}
          >

            {/* Social Media buttons */}
            <div className="absolute right-3 top-3 flex gap-2">
              {/* LinkedIn button */}
              {TEAM_MEMBERS.find(m => m.id === hoveredMember)?.linkedin && (
                <button
                  onClick={() => handleLinkedInClick(hoveredMember)}
                  className="w-6 h-6 text-gray-400 hover:text-blue-700 transition-colors z-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                  aria-label="Visit LinkedIn profile"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              )}
              
              {/* Twitter button */}
              <button
                onClick={() => handleTwitterClick(hoveredMember)}
                className="w-6 h-6 text-gray-400 hover:text-blue-500 transition-colors z-10 flex items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Visit X.com profile"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
            </div>

            {/* Name */}
            <div className="font-bold text-xl mb-1 text-gray-900" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              {TEAM_MEMBERS.find(m => m.id === hoveredMember)?.name}
            </div>
            
            {/* Role */}
            <div className="font-semibold text-[#C8102E] mb-4 text-sm uppercase tracking-wide" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              {TEAM_MEMBERS.find(m => m.id === hoveredMember)?.role}
            </div>
            
            {/* Bio */}
            <div className="text-gray-700 leading-relaxed text-sm" style={{ fontFamily: "'Tomorrow', sans-serif" }}>
              {TEAM_MEMBERS.find(m => m.id === hoveredMember)?.bio}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default TeamPhotos;